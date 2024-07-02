
import gh from '/gh.svg'

export const Header = () => {
  return (
      <div className='bg-gradient-to-b from-black to-transparent h-20  top-0 z-40   p-4 w-full fixed justify-end flex'>
          <a href='https://github.com/Ebrahim-Ramadan/top-github-contributers' className='px-4 py-2' target='_blank'>
              <img
                  alt='gh source code'
                  src={gh}
                  height='30'
                  width='30'
              />
          </a>
    </div>
  )
}