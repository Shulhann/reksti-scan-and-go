"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getFirestore, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { app } from '../firebase'; // Ensure your Firebase config and initialization are here
import { useQRCode } from 'next-qrcode';

export function ProfilBody() {
    const [data, setData] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLogin, user } = useAuth();
    const firestore = getFirestore(app); 
    const { Canvas } = useQRCode();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (user && user.uid && isLogin) {
                    const userRef = doc(firestore, "users", user.uid);
                    const docSnapshot = await getDoc(userRef);
                    if (docSnapshot.exists()) {
                        setDataUser([{ id: docSnapshot.id, ...docSnapshot.data() }]);
                    } else {
                        console.error("No such document!");
                    }
                    const usersRef = collection(firestore, "users");
                    const q = query(usersRef, orderBy("nim", "asc"));
                    const querySnapshot = await getDocs(q);
                    const newData : any= querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setData(newData);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, isLogin, firestore]);

    return (
        <div className=" w-full bg-[#CDE8E5] h-screen">
            <div className="w-full bg-[#CDE8E5] h-screen">
                <p className="text-3xl text-center font-bold pt-5">Profil</p>
                    <div className="flex justify-center w-full h-screen">
                    {dataUser ? (
                        <div className="w-5/6 h-2/3 mt-10 bg-white rounded-xl lg:w-2/5 lg:h-2/3">
                            <div className="flex justify-center mt-10">
                                <Canvas
                                    text={dataUser[0].qrcode}
                                    options={{
                                        errorCorrectionLevel: 'M',
                                        margin: 3,
                                        scale: 4,
                                        width: 200,
                                    }}
                                    />
                            </div>
                            <div className="flex flex-row justify-center">
                                <p className="text-md ml-5 mt-5 w-2/6 lg:w-1/6">Nama</p>
                                <p className="text-md mt-5 w-4/6 lg:w-2/5">: {dataUser[0].nama}</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <p className="text-md ml-5 mt-5 w-2/6 lg:w-1/6">NIM</p>
                                <p className="text-md mt-5 w-4/6 lg:w-2/5">: {dataUser[0].nim}</p>   
                            </div>
                            <div className="flex flex-row justify-center">
                                <p className="text-md ml-5 mt-5 w-2/6 lg:w-1/6">Plat Motor</p> 
                                <p className="text-md mt-5 w-4/6 lg:w-2/5">: {dataUser[0].plat}</p>  
                            </div>
                            <div className="flex flex-row justify-center">
                                <p className="text-md ml-5 mt-5 w-2/6 lg:w-1/6">Saldo</p>
                                <p className="text-md mt-5 w-4/6 lg:w-2/5">: {dataUser[0].saldo}</p>
                            </div>
                            <div className="flex flex-row justify-center">
                                <p className="text-md ml-5 mt-5 w-2/6 lg:w-1/6">Email</p>
                                <p className="text-md mt-5 w-4/6 lg:w-2/5">: {dataUser[0].email}</p>
                            </div>
                        </div>
                        ) : (
                            <p className="text-md mt-5 w-4/6">Something Wrong</p>
                        )}
                </div>
            </div>
        </div>
    )
}