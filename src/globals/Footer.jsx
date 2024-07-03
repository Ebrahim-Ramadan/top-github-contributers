
import yapping from '/yapping.svg'

export const Footer = () => {
  return (
      <div className='bg-gradient-to-b from-black to-transparent h-14  bottom-0 z-40 text-sm  p-4 w-full fixed justify-start flex'>
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
  )
}