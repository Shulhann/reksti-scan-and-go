"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { getFirestore, collection, doc, getDoc, getDocs, updateDoc, orderBy, query } from "firebase/firestore";
import { app } from '../firebase'; // Ensure your Firebase config and initialization are here

export function PenggunaBody() {
    const [data, setData] = useState([]);
    const [dataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLogin, user } = useAuth();
    const firestore = getFirestore(app); // Initialize Firestore
    const [isModalVisible, setModalVisible] = useState(false);
    const [newNama, setNewNama] = useState('');
    const [newNim, setNewNim] = useState('');
    const [newPlat, setNewPlat] = useState('');
    const [newSaldo, setNewSaldo] = useState('');
    const [currentEditedId, setCurrentEditedId] = useState('');

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const handleSaveEdit = async () => {
        try {
            const userRef = doc(firestore, 'users', currentEditedId);
            await updateDoc(userRef, {
                nama: newNama,
                nim: newNim,
                plat: newPlat,
                saldo: parseInt(newSaldo)
            });
            const updatedSnapshot = await getDoc(userRef);
            setDataUser((prevDataUser : any) => 
                prevDataUser.map((user : any) => 
                    user.id === currentEditedId ? { id: updatedSnapshot.id, ...updatedSnapshot.data() } : user
                )
            );
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

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
        <div className="w-full bg-[#CDE8E5] h-screen">
            <p className="text-xl text-center font-bold pt-3">Tabel Pengguna Kendaraan</p>
            <div className="w-3/4 h-3/4 mx-auto bg-white mt-5 overflow-auto">
                <div className="flex flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF] border border-[#4D869C]">
                    <div className="flex w-1/6 justify-center items-start">
                        <p className="text-sm font-medium">No</p>
                    </div>
                    <div className="w-1/6 justify-center items-start hidden lg:block">
                        <p className="text-sm text-center font-medium">Nama</p>
                    </div>
                    <div className="flex w-1/6 justify-center items-start">
                        <p className="text-sm font-medium">NIM</p>
                    </div>
                    <div className="flex w-2/6 justify-center items-start lg:w-1/6">
                        <p className="text-sm font-medium">Plat</p>
                    </div>
                    <div className="w-1/6 justify-center items-start hidden lg:block">
                        <p className="text-sm text-center font-medium">Saldo</p>
                    </div>
                    <div className="flex w-1/6 justify-center items-end">
                        <p className="text-sm font-medium">Edit</p>
                    </div>
                </div>
                    {loading ? (
                        <p className="text-center mt-5">Loading...</p>
                    ) : (
                        data.map((user, index) => ( user.role === 'pengguna' &&
                            <div key={user.id} className="flex flex-row justify-between w-full px-4 py-4 bg-[#F5FFFF]">
                                <div className="flex w-1/6 justify-center items-start">
                                    <p className="text-sm font-medium">{index}</p>
                                </div>
                                <div className="w-1/6 justify-center items-start hidden lg:block">
                                    <p className="text-sm text-center font-medium">{user.nama}</p>
                                </div>
                                <div className="flex w-1/6 justify-center items-start">
                                    <p className="text-sm font-medium">{user.nim}</p>
                                </div>
                                <div className="flex w-2/6 justify-center items-start lg:w-1/6">
                                    <p className="text-sm font-medium">{user.plat}</p>
                                </div>
                                <div className="w-1/6 justify-center items-start hidden lg:block">
                                    <p className="text-sm text-center font-medium">RP {user.saldo}</p>
                                </div>
                                <div className="flex w-1/6 justify-center items-end">
                                    <button className="text-blue-500" onClick={() => { openModal(); setCurrentEditedId(user.id); }} >Edit</button>
                                </div>
                            </div>
                        ))
                    )}

                    {isModalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                                <h2 className="text-xl font-bold text-[#4D869C] mb-4">Edit Akun</h2>
                                <div className="flex flex-col w-full items-center">
                                    <input
                                        type="text"
                                        className="w-10/12 h-12 mx-4 bg-white mb-4 p-2 border border-[#4D869C] rounded"
                                        placeholder="Nama"
                                        value={newNama}
                                        onChange={(e) => setNewNama(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="w-10/12 h-12 mx-4 bg-white mb-4 p-2 border border-[#4D869C] rounded"
                                        placeholder="NIM"
                                        value={newNim}
                                        onChange={(e) => setNewNim(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="w-10/12 h-12 mx-4 bg-white mb-4 p-2 border border-[#4D869C] rounded"
                                        placeholder="Plat"
                                        value={newPlat}
                                        onChange={(e) => setNewPlat(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        className="w-10/12 h-12 mx-4 bg-white mb-4 p-2 border border-[#4D869C] rounded"
                                        placeholder="Saldo"
                                        value={newSaldo}
                                        onChange={(e) => setNewSaldo(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={handleSaveEdit}
                                        className="w-36 bg-[#4D869C] text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="w-36 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
