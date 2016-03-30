import { Avatar } from 'StyleFn'
import avatarPng from 'assets/img/avatar.png'

const avatarMale = Avatar({
  gender: 'male',
  style: {
    fontSize: '62px'
  }
})

const avatarFemale = Avatar({
  gender: 'female',
  style: {
    fontSize: '62px'
  }
})

const avatarImage = Avatar({
  image: avatarPng,
  style: {
    height: '62px',
    width: '62px'
  }
})

const avatar = {
  name: 'Avatar',
  children: [{
    name: 'Male',
    fn: avatarMale
  }, {
    name: 'Female',
    fn: avatarFemale
  }, {
    name: 'Image',
    fn: avatarImage
  }]
}

export default avatar
export { avatarMale, avatarFemale, avatarImage }
