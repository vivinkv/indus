import { ContactApi } from '@/Datas/Endpoints/Contact';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import LoadingSpinner from '../Common/loading-spinner';

const Contact_Form = () => {
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [phoneNumber, setPhoneNumber] = useState('');

    const [loading, setLoading] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')
    const pageUrl = typeof window !== 'undefined' ? window.location.origin + router.asPath : '';

    const onSubmit = async (data) => {
        setLoading(true)
        const token = await executeRecaptcha("book_form_submit");

        if (!token) {
            seterrorMessage("Recaptcha not verified")
            setTimeout(() => {
                seterrorMessage('')
            }, 5000);
            setLoading(false)
            return
        }
        const dataToSubmit = {
            name: data.name,
            phone_number: phoneNumber, // Get phone from hidden input
            email: data.email,
            message: data?.message,
            source_url: pageUrl,
            lead_type: 'Contact',
            recaptcha_token: token
        };


        try {
            const response = await ContactApi.save(dataToSubmit)
            router.push('/thank-you')
        } catch (error) {
            console.log(error);
            seterrorMessage(error?.message)
            setTimeout(() => {
                seterrorMessage('')
            }, 5000);

        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='w-full md:w-[60%]'>
            <form
                className='contact-form p-5 sm:p-7 xl:p-10 gap-5 flex flex-col items-center rounded-sm bg-[#f1f2f3]'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='w-full gap-1 flex flex-col'>
                    <label>Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className='p-2 border border-gray-300 rounded'
                    />
                    {errors.name && <p className="text-red-500 text-[13px] sm:text-[15px] ">{errors.name.message}</p>}
                </div>

                <div className='w-full gap-1 flex flex-col'>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email format"
                            }
                        })}
                        className='p-2 border border-gray-300 rounded'
                    />
                    {errors.email && <p className="text-red-500 text-[13px] sm:text-[15px] ">{errors.email.message}</p>}
                </div>

                <div className='contact-page-form-phone-input py-2 w-full'>
                    <label>Phone Number<span className='text-[#F60606]'>*</span></label>
                    <PhoneInput
                        countryCodeEditable={false}
                        country="in"
                        value={phoneNumber}
                        onChange={(val) => {
                            setPhoneNumber(val);
                            setValue("phone", val, { shouldValidate: true });
                        }}
                        separateDialCode
                        inputProps={{
                            placeholder: "Enter phone number",
                        }}
                    />
                    <input
                        type="hidden"
                        {...register("phone", {
                            required: "Phone number is required",
                            validate: (value) => value?.length >= 10 || "Invalid phone number"
                        })}
                    />
                    {errors.phone && <p className="text-red-500 text-[13px] sm:text-[15px] ">{errors.phone.message}</p>}
                </div>

                <div className='w-full gap-1 flex flex-col'>
                    <label>Message</label>
                    <textarea className='p-2 border border-gray-300 rounded'
                        {...register("message")}
                    ></textarea>
                </div>

                <div className=' w-full pt-5 pb-5 sm:pb-0 flex justify-center items-center '>
                  
                        <button
                            className='w-[70%] sm:w-[30%] py-2 bg-[#ed1c24] rounded shadow'
                            type='submit'
                            disabled={loading}
                        >
                            {
                                loading ?
                                    <LoadingSpinner heigth={'23px'} width={'23px'} color={'white'} />
                                    :
                                    'SUBMIT'
                            }
                        </button>
                
                </div>

                {
                    errorMessage &&
                    <div className='frm-group'>
                        <span className="text-red-700">{errorMessage}</span>
                    </div>
                }
            </form>
        </div>
    );
};

export default Contact_Form;
