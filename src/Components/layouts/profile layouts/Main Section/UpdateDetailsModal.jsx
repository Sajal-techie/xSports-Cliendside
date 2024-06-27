import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import all_states from '../../../../api/json data/states_districts'
import userApi from '../../../../api/axiosconfig'

const UpdateDetailsModal = ({isOpen,closeModal,id,username,bio,state,district,phone,fetchapi}) => {
    const [districts,setDistricts] = useState([])
    const [formData,setFormData] = useState({
        'username':username ? username : '', 
        'bio': bio ? bio : '',
        'state':state ? state : '',
        'district':district ? district : '',
        'phone': phone ? phone : '',
    })
    console.log(formData,username);
    const states = [...all_states.map((obj)=>(
        obj.state
    ))]

    useEffect(()=>{
        if (formData.state){
            const state = formData.state
            const selectedState = all_states.find((obj) => obj.state === state);
            if (selectedState) {
            setDistricts(selectedState.districts);
            }
        }
    },[])

      // to get all dsitricts from the selected state 
    const handledistrict = (e)=>{
        handleChange(e)
        const state = e.target.value
        const selectedState = all_states.find((obj) => obj.state === state);
        if (selectedState) {
        setDistricts(selectedState.districts);
        }
    }

    //  to handle input change
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData,[name]:value})
    }

    //  to handle form Submission
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await userApi.post('profile',formData)
            console.log(res,'response');
            showToastMessage(res.data)
        }catch(error){
            console.log(error, 'form submission error');
            showToastMessage({status:500,message:error?.code==='ERR_NETWORK'?"Internal Server Error":"Bad Gateway"})
        }
        fetchapi()
        closeModal()
    }
    const showToastMessage = ({ status, message }) => {
        console.log(status, message);
        const options = {
            position: 'bottom-right',
            draggable: true,
        }
        if (status===200){
            toast.success(message, options);
        }
        else{
            toast.error(message,options)
        }
        };
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '900px',
            width: '90%',
            inset: 'auto',
            //  borderRadius: '8px',
            overflow: 'auto',
            padding: '20px',
            border: 'none',
            // top: '50%',
            // transform: 'translateY(-50%)',
            backgroundColor: '#fff',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow:'auto'
          },
        }}
      >
          <div className="items-center mb-5 w-full font-kanit">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize">Add Achievement </h3>
            <form className='px-3 text-center' onSubmit={handleSubmit} encType="multipart/form-data">
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="username" className='mb-2'>Username:</label>
                <input  name='username' id='username' type="text" placeholder='username' value={formData?.username} className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="bio" className='mb-2'>Bio:</label>
                <input  name='bio' id='bio' type="text" placeholder='bio' value={formData.bio} className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="phone" className='mb-2'>Phone Number:</label>
                <input  name='phone' id='phone' type="text" placeholder='phone' value={formData.phone} className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="startMonth" className='mb-2'>Issued Date:</label>
                <div className='w-full text-start flex'>
                  <div  className='w-1/2 '>
                    <select value={formData.state} name="state" id="state" className='w-full border-2 pl-2 py-1 capitalize' onChange={handledistrict}>
                      <option value="" disabled >select state</option>
                      {
                        states.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='w-1/2'>
                    <select value={formData.district} name="district" id="district" className='w-full border-2 pl-2 py-1 capitalize' onChange={handleChange}>
                      <option value="" disabled >select district</option>
                      {
                        districts.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className=''>
                <button className='bg-blue-500 border-2 border-blue-500 rounded-2xl py-1 px-5 text-white mt-4 hover:bg-blue-600'>Save</button>
              </div>
            </form>
          </div>
      </ReactModal>
    </>
  )
}

export default UpdateDetailsModal
