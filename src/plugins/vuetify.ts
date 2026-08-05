import { createVuetify } from 'vuetify'
import { VAlert } from 'vuetify/components/VAlert'
import { VApp } from 'vuetify/components/VApp'
import { VBtn } from 'vuetify/components/VBtn'
import { VCard, VCardText } from 'vuetify/components/VCard'
import { VCol, VContainer, VRow } from 'vuetify/components/VGrid'
import { VDivider } from 'vuetify/components/VDivider'
import { VForm } from 'vuetify/components/VForm'
import { VIcon } from 'vuetify/components/VIcon'
import { VImg } from 'vuetify/components/VImg'
import { VMain } from 'vuetify/components/VMain'
import { VSheet } from 'vuetify/components/VSheet'
import { VSkeletonLoader } from 'vuetify/components/VSkeletonLoader'
import { VTextField } from 'vuetify/components/VTextField'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VCardText,
    VCol,
    VContainer,
    VDivider,
    VForm,
    VIcon,
    VImg,
    VMain,
    VRow,
    VSheet,
    VSkeletonLoader,
    VTextField,
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
