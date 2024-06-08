"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getFirestore, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { app } from '../firebase'; // Ensure your Firebase config and initialization are here
import {DatePicker} from "@nextui-org/date-picker";

const dataRiwayat = [
    {
      id: 1,
      plat: "D 6256 ZBQ",
      masuk: "07:00",
      keluar: "13:00",
      tanggal: "02/04/2024"
    },
    {
      id: 2,
      plat: "B 1234 ABC",
      masuk: "08:00",
      keluar: "14:00",
      tanggal: "02/04/2024"
    },
    {
      id: 3,
      plat: "C 1234 ABC",
      masuk: "09:00",
      keluar: "13:00",
      tanggal: "02/04/2024"
    }
  ];
  
  const dataRiwayatUser = [
    {
      id: 1,
      plat: "D 6256 ZBQ",
      masuk: "07:00",
      keluar: "13:00",
      tanggal: "02/04/2024"
    },
    {
      id: 2,
      plat: "D 6256 ZBQ",
      masuk: "08:00",
      keluar: "14:00",
      tanggal: "02/04/2024"
    },
    {
      id: 3,
      plat: "D 6256 ZBQ",
      masuk: "09:00",
      keluar: "13:00",
      tanggal: "02/04/2024"
    }
  ];

export function RiwayatBody() {
    const [data, setData] = useState([]);
    const [dataUser, setDataUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { isLogin, user } = useAuth();
    const firestore = getFirestore(app); 
    const [startDate, setStartDate] = useState(new Date().getFullYear()); 

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
            <p className="text-xl text-center font-bold pt-3">Daftar Riwayat</p>
            {/* <div className="flex justify-center">
                <DatePicker label="Tanggal" className="max-w-[284px] mt-5"/>
            </div> */}
            <div className="w-3/4 h-3/4 mx-auto mt-5 overflow-auto">
                <div className="flex flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF] border border-[#4D869C]">
                    <div className="flex w-1/12 justify-center items-start">
                        <p className="text-sm font-medium">No</p>
                    </div>
                    <div className="flex w-2/6 justify-center items-start lg:w-1/6">
                        <p className="text-sm font-medium">Plat</p>
                    </div>
                    <div className="w-1/6 justify-center items-start lg:w-1/6 hidden lg:block">
                        <p className="text-sm text-center font-medium">Tanggal</p>
                    </div>
                    <div className="flex w-1/6 justify-center items-start lg:w-1/6">
                        <p className="text-sm font-medium">Masuk</p>
                    </div>
                    <div className="flex w-1/6 justify-center items-end">
                        <p className="text-sm font-medium">Keluar</p>
                    </div>
                </div>
                {loading ? (
                    <p className="text-center mt-5">Loading...</p>
                    ) : (
                    dataUser[0].role == 'admin' ? (
                        dataRiwayat.map((riwayat, index) => (
                        <div className="flex flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF]" key={index}>
                            <div className="flex w-1/12 justify-center items-start">
                            <p className="text-sm font-medium">{index + 1}</p>
                            </div>
                            <div className="flex w-2/6 justify-center items-start lg:w-1/6">
                            <p className="text-sm font-medium">{riwayat.plat}</p>
                            </div>
                            <div className="w-1/6 justify-center items-start hidden lg:block">
                            <p className="text-sm text-center font-medium">{riwayat.tanggal}</p>
                            </div>
                            <div className="flex w-1/6 justify-center items-start lg:w-1/6">
                            <p className="text-sm font-medium">{riwayat.masuk}</p>
                            </div>
                            <div className="flex w-1/6 justify-center items-end">
                            <p className="text-sm font-medium">{riwayat.keluar}</p>
                            </div>
                        </div>
                        ))
                    ) : (
                        dataRiwayatUser.map((riwayat, index) => (
                        <div className="flex flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF]" key={index}>
                            <div className="flex w-1/12 justify-center items-start">
                            <p className="text-sm font-medium">{index + 1}</p>
                            </div>
                            <div className="flex w-2/6 justify-center items-start lg:w-1/6">
                            <p className="text-sm font-medium">{riwayat.plat}</p>
                            </div>
                            <div className="w-1/6 justify-center items-start hidden lg:block">
                            <p className="text-sm text-center font-medium">{riwayat.tanggal}</p>
                            </div>
                            <div className="flex w-1/6 justify-center items-start lg:w-1/6">
                            <p className="text-sm font-medium">{riwayat.masuk}</p>
                            </div>
                            <div className="flex w-1/6 justify-center items-end">
                            <p className="text-sm font-medium">{riwayat.keluar}</p>
                            </div>
                        </div>
                        ))
                    )
                    )}
            </div>
        </div>
    );
}