import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, InputForm } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { apiUpdateInfor } from '../../apis/user'
import { getInforUser } from '../../store/users/asyncActions'
import { toast } from 'react-toastify'

const Personal = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const { current } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [editElm, setEditElm] = useState(null);
  useEffect(() => {
    reset({
      name: current?.name,
      email: current?.email,
      phoneNumber: `0${current?.phoneNumber}`,

    })
  }, []);

  const handleUpdateInfo = async (data) => {
    const formData = new FormData()
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
    delete data.avatar
    for (let i of Object.entries(data)) formData.append(i[0], i[1])

    const response = await apiUpdateInfor(formData)
    console.log(response)
    if (response.success) {
      dispatch(getInforUser())
      toast.success(response.mes)
      setEditElm(null)
    } else toast.error(response.mes)

  }
  return (
    <div className='w-full relative px-4'>
      <header className='flex justify-between py-4 border-b border-b-blue-200'>
        <div className='text-3xl font-semibold'>Information</div>
        {editElm?._id === current._id
          ? <div
            onClick={() => setEditElm(null)}
            className='w-[200px] h-[36px] bg-main rounded-md items-center justify-center flex text-white cursor-pointer'>
            Cancel
          </div>
          : <div
            onClick={() => setEditElm(current)}
            className='w-[200px] h-[36px] bg-main rounded-md items-center justify-center flex text-white cursor-pointer'>
            Edit Information
          </div>
        }

      </header>

      <form onSubmit={handleSubmit(handleUpdateInfo)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        {editElm?._id === current._id
          ? <div className='flex items-center justify-center gap-2'>
            <label htmlFor='file'><img src={current.avatar} alt='avatar' className='w-[200px] h-[200px] rounded-full object-cover' /></label>
            <input type='file' id='file' {...register('avatar')} hidden />
          </div>
          : <div className='flex items-center justify-center gap-2'>
            <img src={current.avatar} alt='avatar' className='w-[200px] h-[200px] rounded-full object-cover' />
          </div>}

        {editElm?._id === current._id
          ? <InputForm
            label='Name'
            register={register}
            errors={errors}
            id='name'
            validate={{ required: 'Name  can not empty' }}
          />
          : <InputForm
            label='Name'
            register={register}
            errors={errors}
            id='name'
            disabled={true}
          />}
        {editElm?._id === current._id
          ? <InputForm
            label='Email address'
            register={register}
            errors={errors}
            id='email'
            validate={{
              required: 'Email can not empty',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address invalid"
              }
            }} />
          : <InputForm
            label='Email address'
            register={register}
            errors={errors}
            id='email'
            disabled={true}
          />}
        {editElm?._id === current._id
          ? <InputForm
            label='Phone Number'
            register={register}
            errors={errors}
            id='phoneNumber'
            validate={{
              required: 'Phone number can not empty',
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                message: 'Phone invalid'
              }
            }}
          />
          : <InputForm
            label='Phone Number'
            register={register}
            errors={errors}
            id='phoneNumber'
            disabled={true}
          />}

        <div className='flex items-center gap-2'>
          <span className='font-medium'>Account status:</span>
          <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Account status:</span>
          <span className='capitalize'>{current?.role}</span>
        </div>
        {editElm && <Button type='submit' fw>Update</Button>}
      </form>
    </div>
  )
}

export default Personal