import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';
import { ContactApi } from '@/Datas/Endpoints/Contact';
import LoadingSpinner from '../Common/loading-spinner';
import { Call2Icon, ClosemodalIcon, Location2Icon, UserIcon } from "./svgicons";
import logo from '../../public/logo.svg';
import car from '../../public/modalcar.png';
import car2 from '../../public/popup.gif';

const EnquiryModal = ({ open, setOpen, title, book, documentId, callBack }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open]);

    const closeModal = () => {
        setOpen(false);
        setLoading(false)
    }

    const pageUrl =
        typeof window !== 'undefined'
            ? window.location.origin + router.asPath
            : '';

    const onSubmit = async (details) => {
        setLoading(true);
        const token = await executeRecaptcha("enquiry_form_submit");

        if (!token) {
            setErrorMessage("Recaptcha not verified");
            setTimeout(() => setErrorMessage(''), 5000);
            setLoading(false);
            return;
        }

        const dataToSubmit = {
            name: details?.name,
            phone_number: details?.phone,
            city: details?.location,
            lead_type: book ? 'Book' : documentId ? 'Test Drive' : callBack ? 'Request Callback' : 'Sell',
            recaptcha_token: token,
            source_url: pageUrl,
            ...(documentId ? { car_id: documentId } : {})
        };

        // console.log(dataToSubmit)

        try {
            await ContactApi.save(dataToSubmit);
            router.push('/thank-you');
        } catch (error) {
            setErrorMessage(error?.message || "Something went wrong");
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        open && (
            <div onClick={closeModal} className="modal-overlay">
                <div onClick={(e) => e.stopPropagation()} className="modal-content enquire-modal">
                    <div className="grid md:grid-cols-2">
                        <div className="modal-left">
                            <Image src={logo} alt='' className='modal-logo' width={100} />
                            <h2>Drive Your Dream Car Today!</h2>
                            <Image src={car} alt='' className='modal-car' />
                        </div>

                        <div className="modal-right">
                            <span className="close-modal-btn" onClick={closeModal}> <ClosemodalIcon /> </span>
                            <div className="flex justify-center items-center">
                                <h3>{title}</h3>
                                <Image src={car2} alt='' width={192} height={144} />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-cntr mb-[17px]">
                                    <UserIcon />
                                    <input type="text" placeholder="Enter Your Name" {...register("name", { required: "Name is required" })} />
                                    {errors.name && <span className="text-red-700">{errors.name.message}</span>}
                                </div>

                                <div className="form-cntr mb-[17px]">
                                    <Call2Icon />
                                    <input type="text" placeholder="Phone number" {...register("phone", { required: "Phone number is required", pattern: { value: /^[0-9]+$/, message: "Invalid phone number" } })} />
                                    {errors.phone && <span className="text-red-700">{errors.phone.message}</span>}
                                </div>

                                <div className="form-cntr mb-[17px]">
                                    <Location2Icon />
                                    <input type="text" placeholder="Location" {...register("location", { required: "Location is required" })} />
                                    {errors.location && <span className="text-red-700">{errors.location.message}</span>}
                                </div>

                                <button className='btn' type='submit'>
                                    {loading ? <LoadingSpinner heigth={'20px'} width={'20px'} color={'white'} /> : 'Submit'}
                                </button>

                                {errorMessage && <div className='frm-group'><span className="text-red-700">{errorMessage}</span></div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default EnquiryModal;
