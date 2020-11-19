import React from 'react'
import { useSelector } from 'react-redux'

import ViewPersonalInformation from './view'
import EditPersonalInformation from './edit'

import { getUserData, getIsProfileEdit } from '../../store/user/userSelectors'

export default function PersonalInformation() {
  const isEdit = useSelector(getIsProfileEdit)
  const data = useSelector(getUserData)

  return (
    <>
      {isEdit ? (
        <EditPersonalInformation data={data} />
      ) : (
        <ViewPersonalInformation data={data} />
      )}
    </>
  )
}
