import { BallTriangle } from 'react-loader-spinner'

const Loader = ({loadingContent}) => {
  return (
    <div className='loader'>
      <BallTriangle
          height={70}
          width={70}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
      <p>{loadingContent}</p>
    </div>
  )
}

export default Loader