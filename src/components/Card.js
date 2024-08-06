const Card = ({data, summary}) => {
    // console.log(summary);
    
  return (
    <div className='card'>
        <div className='productImg'>
            <img src={data['image:image'][0]['image:loc']} alt="" />
        </div>
        <div className='productDetails'>
            <h2 className='title'>{data['image:image'][0]['image:title']}</h2>
            <ul className='list'>
                {summary && summary.map((i) => (
                    <li>{i}</li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Card