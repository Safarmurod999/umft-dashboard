import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";

import { useDispatch, useSelector } from 'react-redux';
import { deleteData, fetchData, updateData, addData } from "../../../store/slice";
import Error from '../../Error/Error';
import { Spinner } from '../../../components';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
const Department = () => {
    const { pathname } = useLocation()
    const [editMode, setEditMode] = useState(null);
    const [edit, setEdit] = useState("");
    const [data, setData] = useState("")
    let accessToken = localStorage.getItem("access_token") || "";

    const dispatch = useDispatch();
    const department = useSelector((state) => state.data.data);
    const isLoading = useSelector((state) => state.data.isLoading);
    const error = useSelector((state) => state.data.error);

    useEffect(() => {
        dispatch(fetchData({ apiEndpoint: "department?quantity=20", accessToken }));
    }, [dispatch, pathname]);

    const deleteDepartment = (id) => {
        dispatch(deleteData({ apiEndpoint: "department", id, accessToken }));
        toast.error("Mahsulot o'chirildi");
    };
    const updateDepartment = (data) => {
        let newData = data;
        dispatch(updateData({ apiEndpoint: "department", newData, accessToken }));
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
    };
    const addDepartment = (e) => {
        e.preventDefault()
        let newData = { title: data };
        dispatch(addData({ apiEndpoint: "department", newData, accessToken }));
        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");
    };
    if (isLoading) {
        return <Spinner position={"relative"} />;
    }
    if (error) {
        <Error error={error} />
    }

    return (
        department && (
            <section className='pt-[104px]'>
                <div className="max-w-[95%] mx-auto w-full flex items-center justify-between">
                    <h1 className="  text-2xl font-bold text-gray-800 mb-[40px]">
                        Department List
                    </h1>
                    <form className='flex'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-6 py-3 rounded-md focus:outline-none"
                        />
                        <button type="submit" className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Search
                        </button>
                    </form>
                </div>
                <div className="relative overflow-x-auto max-w-[95%] mx-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-lg border">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    title
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    boss
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white">
                                    created Time
                                </th>
                                <th scope="col" className="px-6 py-4 border border-gray-300 bg-gray-700 text-white"> actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                department.map((el) => (
                                    <tr key={el._id} className="bg-white border-b border-gray-200">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {el.userId}
                                        </th>
                                        <td className="px-6 py-4">
                                            <input type="text" value={el._id == editMode ? edit != "" ? edit : el.title : el.title} disabled={el._id != editMode} onChange={(e) => setEdit(e.target.value)} className='border-none focus:ring-1' />
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.boss ?? "false"}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.createdTime}
                                        </td>
                                        <td className='space-x-[10px]'>
                                            {
                                                editMode != el._id ? (<button
                                                    type="button"
                                                    className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 ring-blue-300 ring-1"
                                                    onClick={() => setEditMode(el._id)}
                                                >
                                                    <MdEdit
                                                        style={{ fill: "#00f", fontSize: "20px" }}
                                                    />
                                                </button>) : (
                                                    <button
                                                        type="button"
                                                        className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 ring-blue-300 ring-1"
                                                        onClick={() => {
                                                            updateDepartment({ _id: el._id, title: edit });
                                                            setEditMode(null);
                                                        }}
                                                    >
                                                        <FaRegSave style={{ fill: "#00f", fontSize: "20px" }} />
                                                    </button>
                                                )
                                            }
                                            <button
                                                type="button"
                                                className="focus:outline-none text-white bg-white focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 ring-red-300 ring-1"
                                                onClick={() => deleteDepartment(el._id)}
                                            >
                                                <MdDeleteOutline
                                                    style={{ fill: "#f00", fontSize: "20px" }}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="max-w-[95%] mx-auto">
                    <form className='flex space-x-[10px] items-center' onSubmit={addDepartment}>
                        <div className="py-4 flex flex-col">
                            <label htmlFor="title">Title</label>
                            <input type="text" value={data} onChange={(e) => setData(e.target.value)} className='border rounded-lg focus:ring-1' required/>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-[100px] mt-6 focus:outline-none text-blue bg-white focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 ring-blue-300 ring-1"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    )
}

export default Department