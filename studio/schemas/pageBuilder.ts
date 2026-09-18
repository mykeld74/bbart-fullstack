import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page builder',
  type: 'array',
  of: [
    defineArrayMember({type: 'textBlock'}),
    defineArrayMember({type: 'imageWithCaption'}),
    defineArrayMember({type: 'imagePair'}),
    defineArrayMember({type: 'splitContent'}),
  ],
  options: {
    insertMenu: {
      views: [{name: 'list'}, {name: 'grid'}],
    },
  },
})
