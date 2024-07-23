const {AdPost, validateAdPost} = require("../../models/Ad/AdPost");
const bot = require("../../bot/bot");
const {config} = require("../../packages");
const {User} = require("../../models/models");
const {
    getAllWithPopulate,
    getAllWithPopulateForUser,
} = require("./constants");
const {default: mongoose} = require("mongoose");
const {editDescription} = require("../../helpers/helper");

async function create(req, res) {
    try {
        const {error} = validateAdPost(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        const newAd = await AdPost.create(req.body);

        const adPost = await AdPost.findById(newAd.id)
            .populate("adType")
            .populate("target.costForOneUser");

        let totalAdTypeCost = 0;

        adPost.adType.forEach((el) => {
            totalAdTypeCost += el.price;
        });

        const user = await User.findOne({_id: adPost.user, isArchive: false});

        if (!user) {
            return res.status(404).send({error: "User not found"});
        }

        let totalSum = 0;

        if (adPost.target.costForOneUser) {
            totalSum =
                totalAdTypeCost +
                adPost.target.adViewCount * adPost.target.costForOneUser.sum;
        } else {
            totalSum += totalAdTypeCost;
        }

        adPost.totalSum = totalSum;
        await adPost.save();

        res.status(200).send({message: "success", id: newAd.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function getAll(req, res) {
    try {
        const ad = await getAllWithPopulate({isArchive: false});

        res.status(200).send(ad);
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function update(req, res) {
    try {
        const {name, description, images, region, categories} = req.body;

        const ad = await AdPost.findOneAndUpdate(
            {_id: req.params.id, isArchive: false},
            {name, description, images, region, categories},
            {
                new: true,
            }
        );

        if (!ad) {
            return res.status(404).send({error: "Not Found"});
        }

        res.status(200).send({message: "Updated", id: ad.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function updateMedia(req, res) {
    try {
        const {mediaArray} = req.body;
        const ad = await AdPost.findOneAndUpdate(
            {_id: req.params.id, isArchive: false},
            {images:mediaArray},
            {new: true}
        );
        if (!ad) {
            return res.status(404).send({error: "Not Found"});
        }

        res.status(200).send({message: "Updated", id: ad.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function remove(req, res) {
    try {
        const ad = await AdPost.findOneAndDelete({_id: req.params.id});

        if (!ad) {
            return res.status(404).send({error: "Not Found"});
        }

        res.status(200).send({message: "Deleted", id: ad.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function confirm(req, res) {
    try {
        const id = req.params.id;

        const adPost = await AdPost.findOne({_id: id, isArchive: false})
            .populate("adType")
            .populate("target.costForOneUser");

        if (!adPost) {
            return res.status(404).send({error: "Post not found"});
        }

        if (adPost.is_confirmed) {
            return res.status(400).send({error: "Post is confirmed"});
        }

        const user = await User.findOne({_id: adPost.user, isArchive: false});

        if (!user) {
            return res.status(404).send({error: "User not found"});
        }

        user.balance -= adPost.totalSum;
        adPost.is_confirmed = true;
        await user.save();
        await adPost.save();

        res
            .status(200)
            .send({message: "success", cost: adPost.totalSum, id: adPost.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function publish(req, res) {
    try {
        const id = req.params.id;

        const adPost = await AdPost.findOne({
            _id: id,
            isArchive: false,
        }).populate("target.target_categories");

        if (!adPost) {
            return res.status(404).send({error: "Post not found"});
        }

        if (adPost.target.adView !== "orgs") {
            return res.status(400).send({error: "Bad request"});
        }

        if (!adPost.is_confirmed) {
            return res.status(400).send({error: "Before publish confirm post!"});
        }

        if (adPost.is_published) {
            return res.status(400).send({error: "Already published"});
        }

        if (!adPost.target.target_categories.length) {
            return res.status(404).send({error: "Categories not found"});
        }

        const setOfTgChannelIDs = new Set();

        adPost.target.target_categories.forEach((el) => {
            setOfTgChannelIDs.add(el.tgChannellID);
        });

        // let editedDesription = adPost.description;

        // if (editedDesription.length > 900) {
        //   editedDesription = editedDesription.split(".").slice(0, 4).join(". ");
        // }

        const base_url = `${config.get("base_url")}/announcements/${adPost.id}`;
        const editedDescription = editDescription(adPost.description, base_url);

        setOfTgChannelIDs.forEach((el) => {
            // console.log(el);
            // if (adPost.images.length) {
            bot.sendPhoto(el, adPost.images[0], {
                caption: `<b>${adPost.name}</b>\n\n${editedDescription}`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Показать",
                                url: base_url,
                            },
                        ],
                    ],
                },
            });
            // } else {
            // bot.sendMessage(el, `<b>${adPost.name}</b>\n\n${adPost.description}`, {
            //   parse_mode: "HTML",
            //   reply_markup: {
            //     inline_keyboard: [
            //       [
            //         {
            //           text: "Показать",
            //           url: `${config.get("base_url")}/announcements/${adPost.id}`,
            //         },
            //       ],
            //     ],
            //   },
            // });
            // }
        });

        adPost.is_published = true;
        await adPost.save();

        res.status(200).send({message: "success", id: adPost.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function forUser(req, res) {
    try {
        const {id} = req?.user;
        const {page, count} = req.body;

        const user = await User.findOne({_id: id, isArchive: false}).populate(
            "organization"
        );

        if (!user) {
            return res.status(404).send({error: "User not found"});
        }
        let sortedPosts;

        if (user.organization && user.organization.is_active) {
            sortedPosts = await getAllWithPopulateForUser(
                {
                    $or: [
                        {
                            $and: [
                                {"target.adView": "orgs"},
                                {
                                    $or: [
                                        {"target.target_region": user.region},
                                        {
                                            "target.target_tradetypes": user.organization.tradetypes,
                                        },
                                        {
                                            "target.target_categories": user.organization.categories,
                                        },
                                    ],
                                },
                            ],
                        },
                        {"target.adView": "all"},
                    ],
                    is_confirmed: true,
                    isArchive: false,
                    user: {$ne: id},
                },
                page,
                count
            );
        } else {
            sortedPosts = await getAllWithPopulateForUser(
                {
                    $or: [
                        {
                            $and: [
                                {"target.adView": "users"},
                                {"target.target_region": user.region},
                            ],
                        },
                        {"target.adView": "all"},
                    ],
                    is_confirmed: true,
                    isArchive: false,
                    user: {$ne: id},
                },
                page,
                count
            );
        }

        res.status(200).send({data: sortedPosts, totalCount: sortedPosts.length});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function getAdPostByFilter(req, res) {
    try {
        const {count, page, post, categories, tradetypes, regions, user, name} =
            req.body;

        const {isCount} = req.query;

        let query = {isArchive: false, is_confirmed: true};
        let adPost;

        if (tradetypes?.length > 0) {
            query.tradetypes = {$in: tradetypes};
        }
        if (regions?.length) {
            query.region = {$in: regions};
        }
        if (categories?.length) {
            query.categories = {$in: categories};
        }
        if (post === "my") {
            query.user = user;
        }
        if (name?.length > 0) {
            query.name = new RegExp(".*" + name + ".*", "i");
        }

        if (isCount) {
            adPost = adPost = await AdPost.find(query).count();

            return res.status(200).send({totalCount: adPost});
        } else {
            adPost = await getAllWithPopulateForUser(query, page, count);

            return res.status(200).json(adPost);
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function getById(req, res) {
    try {
        const postId = req.params.id;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).send({error: "Invalid ID"});
        }

        const post = await AdPost.findOne({_id: postId, isArchive: false})
            .populate({path: "tradetypes", select: "name"})
            .populate({path: "region", select: "name"})
            .populate({path: "categories", select: "name"})
            .populate({
                path: "user",
                select: "firstname lastname phone image",
                populate: {
                    path: "organization",
                    select: "name phones address media email image",
                },
            })
            .select(
                "tradetypes region categories name description image user createdAt images"
            );

        if (!post) {
            return res.status(404).send({error: "Not Found"});
        }

        res.status(200).send(post);
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function getByIdWithToken(req, res) {
    try {
        const id = req?.user?.id;
        const postId = req.params.id;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).send({error: "Invalid ID"});
        }

        const post = await AdPost.findOne({_id: postId, isArchive: false})
            .populate({path: "tradetypes", select: "name"})
            .populate({path: "region", select: "name"})
            .populate({path: "categories", select: "name"})
            .populate({
                path: "user",
                select: "firstname lastname phone image",
                populate: {
                    path: "organization",
                    select: "name phones address media email image",
                },
            })
            .select(
                "tradetypes region categories name description image user whoseen createdAt images"
            );

        if (!post) {
            return res.status(404).send({error: "Not Found"});
        }

        const data = {
            _id: post.id,
            tradetypes: post.tradetypes,
            region: post.region,
            categories: post.categories,
            name: post.name,
            description: post.description,
            image: post.images,
            user: post.user,
            createdAt: post.createdAt,
            images: post.images,
        };

        if (id && !post.whoseen.includes(id)) {
            post.whoseen.unshift(id);
            await post.save();
        }

        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function getStatistics(req, res) {
    try {
        const {get} = req.body;
        const id = req.params?.id;
        const userId = req?.user?.id;

        const post = await AdPost.findOne({_id: id, isArchive: false})
            .populate({
                path: "whoseen",
                select: "firstname lastname phone region district image createdAt",
                populate: [
                    {path: "region", select: "name"},
                    {path: "district", select: "name"},
                    {
                        path: "organization",
                        select: "name phones region district image",
                        populate: [
                            {path: "region", select: "name"},
                            {path: "district", select: "name"},
                        ],
                    },
                ],
            })
            .populate({
                path: "favorites",
                select: "firstname lastname phone region district image createdAt",
                populate: [
                    {path: "region", select: "name"},
                    {path: "district", select: "name"},
                    {
                        path: "organization",
                        select: "name phones region district image",
                        populate: [
                            {path: "region", select: "name"},
                            {path: "district", select: "name"},
                        ],
                    },
                ],
            })
            .populate({
                path: "interest",
                select: "firstname lastname phone region district image createdAt",
                populate: [
                    {path: "region", select: "name"},
                    {path: "district", select: "name"},
                    {
                        path: "organization",
                        select: "name phones region district image",
                        populate: [
                            {path: "region", select: "name"},
                            {path: "district", select: "name"},
                        ],
                    },
                ],
            });

        if (!post) {
            return res.status(404).send({error: "Not Found"});
        }

        if (post.user != userId) {
            return res.status(400).send({error: "Not your ad. Get out"});
        }

        if (get === "whoseen") {
            return res.status(200).send({data: post.whoseen});
        } else if (get === "favorites") {
            return res.status(200).send({data: post.favorites.reverse()});
        } else if (get === "interest") {
            return res.status(200).send({data: post.interest});
        } else {
            return res.status(400).send({error: "Bad Request"});
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

async function setInteres(req, res) {
    try {
        const {id} = req?.user;
        const {postId} = req.body;

        const post = await AdPost.findOne({_id: postId, isArchive: false});

        if (!post) {
            return res.status(404).send({error: "Not Found"});
        }

        post.interest.unshift(id);
        await post.save();

        res.status(200).send({message: "success", postId: post.id});
    } catch (error) {
        console.log(error);
        res.status(501).json({error: "Ошибка в сервере..."});
    }
}

// function getQuery(obj) {
//   const query = { $or: [] };

//   for (let key in obj) {
//     if (obj[key].length) {
//       obj[key].forEach((el) => {
//         let data = {};
//         data[key] = el._id;
//         query.$or.push(data);
//       });
//     }
//   }

//   return query;
// }

// async function getUsersCountAndCost(data) {
//   const result = { count: 0, cost: 0 };
//   const query = getQuery(data);
//   const countedUsers = await User.count({ ...query, organization: null });
//   result.count = countedUsers;
//   result.cost += countedUsers * config.get("adCostForOneUser");
//   return result;
// }

// async function getOrgsCountAndCost(data) {
//   const result = { count: 0, cost: 0 };
//   const query = getQuery(data);
//   const countedOrgs = await Organization.count({
//     ...query,
//     is_active: true,
//   });
//   result.count = countedOrgs;
//   result.cost += countedOrgs * config.get("adCostForOneUser");
//   return result;
// }

module.exports = {
    create,
    getAll,
    update,
    remove,
    confirm,
    publish,
    forUser,
    getAdPostByFilter,
    getById,
    getStatistics,
    setInteres,
    getByIdWithToken,
    updateMedia
};
