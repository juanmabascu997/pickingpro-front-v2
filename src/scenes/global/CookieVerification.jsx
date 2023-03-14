import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
import { validRoute } from '../../utils/APIRoutes';
import { setLogin } from '../../redux/actions/actions';
import { useDispatch } from 'react-redux';

const CookieVerification = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const verifyUser = async () => {
        const userdata = await JSON.parse(localStorage.getItem("userData"));
        if (!userdata) {
            navigate("/login");
            setLogin(true).then((res) => {
                dispatch(res);
            })
        } else {
            const { data } = await axios.post(
                validRoute,
                { mydata: userdata.token },
                {
                    withCredentials: true,
                }
            );
            
            if (!data.status) {
                localStorage.removeItem("userData");
                navigate("/login");
                setLogin(false).then((res) => {
                    dispatch(res);
                })
            } else {
                setLogin(false).then((res) => {
                    dispatch(res);
                })
            }
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    return <></>;
}

export default CookieVerification