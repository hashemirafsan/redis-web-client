import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

function Home() {
    const [show, setShow] = useState(null);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
      fetch('/api/list')
      .then(response => response.json())
      .then(data => {
        setKeys(data.keys);
      })

    }, [])

    return (
        <>
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Redis Web Client</p>
                        <div>
                            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">Add New</p>
                            </button>
                            <button className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                <p className="text-sm font-medium leading-none text-white">Add New</p>
                            </button>
                        </div>
                
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-left pl-4">Key</th>
                                <th className="font-normal text-left pl-4">Value</th>
                                <th className="font-normal text-left pl-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {
                              keys && keys.map((key, index) => {
                                return (
                                <tr key={index} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                    <td className="pl-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="pl-4">
                                                <p className="font-medium">{key}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-4">
                                        <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                            <div className="w-20 h-3 bg-green-progress rounded-full" />
                                        </div>
                                    </td>
                                    <td className="pl-4">
                                        <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                            <div className="w-20 h-3 bg-green-progress rounded-full" />
                                        </div>
                                    </td>
                                </tr>
                                )
                              })
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;
