"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[577],{29577:function(e,t,i){i.r(t);var n=i(93433),r=i(29439),o=i(72791),a=i(21399),l=i(59434),s=i(93356),u=i(54373),c=i(98285),d=i(84341),f=i(763),g=i(35165),p=i(75393),h=i(57689),v=i(94397),m=i(16088),x=i(75454),Z=i(80184);t.default=function(){var e=(0,l.I0)(),t=(0,h.TH)(),i=(0,l.v9)((function(e){return e.login})),b=i.logged,j=i.userData,y=j.user,S=j.organization,w=(0,v.Z)().width,k=(0,l.v9)((function(e){return e.products})),C=k.products,N=k.loading,P=(0,l.v9)((function(e){return e.filter})),B=P.product,F=P.categories,z=P.subcategories,I=P.subcategories2,M=P.tradetypes,T=P.regions,D=P.districts,E=P.name,H=(0,o.useState)(null),V=(0,r.Z)(H,2),q=V[0],O=V[1],Y=(0,o.useState)(0),_=(0,r.Z)(Y,2),J=_[0],R=_[1],X=(0,o.useState)(0),A=(0,r.Z)(X,2),G=A[0],K=A[1],L=(0,o.useState)(w<720?20:15),Q=(0,r.Z)(L,2),U=Q[0],W=Q[1],$=(0,o.useState)(!1),ee=(0,r.Z)($,2),te=ee[0],ie=ee[1],ne=(0,o.useState)(null),re=(0,r.Z)(ne,2),oe=re[0],ae=re[1],le=(0,o.useState)(!1),se=(0,r.Z)(le,2),ue=se[0],ce=se[1],de=(0,o.useState)(null),fe=(0,r.Z)(de,2),ge=fe[0],pe=fe[1],he=function(e){O(e),ae("approve"),ie(!0)},ve=function(e){O(e),ae("createProduct"),ie(!0)};return(0,o.useEffect)((function(){var i,r;window.history.replaceState({},document.title);var o=null===t||void 0===t||null===(i=t.state)||void 0===i||null===(r=i.category)||void 0===r?void 0:r._id,a={page:G,count:U,product:B,categories:F,subcategories:z,subcategories2:I,tradetypes:M,regions:T,districts:D,user:null===y||void 0===y?void 0:y._id,name:E};o&&(a.categories=[].concat((0,n.Z)(F),[o])),e((0,c.Xp)(a)),e((0,c.Y2)(a)).then((function(e){var t=e.payload.totalCount;e.error||R(t)}))}),[e,B,G,U,F,z,I,M,T,D,y,E,w]),(0,o.useEffect)((function(){W(w<720?20:15)}),[w]),(0,o.useEffect)((function(){e((0,c.sR)())}),[e]),(0,Z.jsxs)("div",{className:"w-full bg-white pb-[100px]",children:[(0,Z.jsx)("div",{className:"md:container",children:(0,Z.jsxs)("div",{className:"w-full block md:flex",children:[(0,Z.jsx)(p.Z,{filterBody:ge,filterVisible:ue,setFilterVisible:ce}),(0,Z.jsxs)("div",{className:"w-full md:px-4 flex flex-col gap-[20px]",children:[(0,Z.jsx)(a.Z,{isOrganization:!!S,totalDatas:J,currentPage:G,setCurrentPage:K,filter:s.h,count:J,onClick:function(){return ae("createProduct"),ie(!0),void O(null)},handleFilter:function(t){var i=t.target.value;e((0,u.BY)(i))},filterData:B,setFilterBody:pe,setFilterVisible:ce,mainTitle:"\u0422\u043e\u0432\u0430\u0440\u044b",countTitle:"Jami:",filterBtnClick:function(){return ce(!ue)}}),N?(0,Z.jsx)(x.ZP,{}):(0,Z.jsx)("div",{className:"grid grid-cols-2 px-2 gap-2 md:grid-cols-5 md:gap-3",children:(0,f.map)(C,(function(e){return(0,Z.jsx)(g.Z,{logged:b,product:e,editHandler:ve,deleteHandler:he},(0,f.uniqueId)())}))}),J>0&&(0,Z.jsx)("div",{className:"flex justify-center py-2",children:(0,Z.jsx)(m.Z,{defaultPage:1,variant:"outlined",color:"primary",count:Math.ceil(J/U),page:G+1,onChange:function(e,t){K(t-1)}})})]})]})}),(0,Z.jsx)(d.Z,{isOpen:te,body:oe,closeModal:function(){ie(!1)},toggleModal:function(){ie(!te)},productId:q,modalBody:oe,headerText:"Mahsulotni o'chirish",title:"Siz rostdan ham mahsulotni o'chirmoqchimisiz?",approveFunction:function(){q&&e((0,c.Ir)({id:q})).then((function(e){e.error||(ie(!1),O(null))}))}})]})}}}]);
//# sourceMappingURL=577.f10c62ae.chunk.js.map