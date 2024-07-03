
import yapping from '/yapping.svg'

export const Footer = () => {
  return (
      <div className='bg-gradient-to-b from-black to-transparent h-14 bottom-6 md:bottom-0 z-40 text-sm  p-4 w-full fixed justify-between flex md:flex-row gap-2 px-4 flex-col'>
      <div className='flex items-center flex-row'>
      created by
          <a href='https://x.com/scoopsahoykid' className='px-1' target='_blank'>
              @Ebrahim Ramadan
          </a>
          <img
          src={yapping}
          alt='yapping'
          className='w-5 h-5'
          />
      </div>
      <div>
        <a href='' target='_blank' className='underline'>
        what is this
        </a>
      </div>
    </div>
  )
}