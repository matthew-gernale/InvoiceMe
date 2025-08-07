


const Unauthorized = () => {
  return (
      <section className='min-h-screen relative'>
          <div className='absolute top-[40%] left-[50%] translate-[-50%] h-full flex flex-col items-center justify-center select-none'>
              <img
                  src='/images/error/unauthorized.png'
                  className='max-h-[200px]'
                  alt='unauthorized icon' />

              <h1 className='font-subheader text-2xl font-bold text-gray-300 mb-2'>Unauthorized Access</h1>
              <p className='font-subheader !text-gray-300 mb-6'>
                  You don't have permission to view this page.
              </p>
          </div>
      </section>
  );
}

export default Unauthorized;