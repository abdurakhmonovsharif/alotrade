import React from 'react'
import Card from 'react-bootstrap/Card';

const HeaderCard = ({title,count}) => {
  return (
    <Card style={{ width: '18rem',borderRadius:"30px",border:"1px solid #00c2cb" }}>
      <Card.Body style={{padding:"21px"}} className='flex flex-col items-center justify-center '>
        <span className='text-[48px] font-sans font-semibold'>
         {count}
        </span>
        <span className='text-[14px]'>{title}</span>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
        
  
      </Card.Body>
    </Card>
  )
}

export default HeaderCard