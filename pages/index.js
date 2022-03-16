import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

function Home() {
    const [show, setShow] = useState(false);
    const [keys, setKeys] = useState([]);
    const [form, setForms] = useState({
      key: null,
      value: null
    })

    useEffect(() => {
      fetch('/api/list')
      .then(response => response.json())
      .then(data => {
        const refactorData = data.keys.map(key => {
          return {
            name: key,
            value: null
          }
        })
        setKeys(refactorData);
      })

    }, [])

    function getData(key, index) {
      fetch(`/api/${key}`)
      .then(response => response.json())
      .then(data => {
        keys[index].value = data.value;
        setKeys([...keys]);
      })
    }

    function removeData(key, index) {
      fetch(`/api/${key}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        let newKeys = keys.filter((ite, iIndex) => iIndex !== index);
        setKeys([...newKeys]);
      })
    }

    function getButtonOrValue(key, value, index) {
      if (value) {
        return (<p className="text-sm font-medium leading-none">{value}</p>);
      }

      return (
        <button onClick={() => getData(key, index)} className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
            <p className="text-sm font-medium leading-none text-white">View</p>
        </button>
      )
    }

    function formHandler(evt, key) {
      let newForm = {
        ...form
      }
      newForm[key] = evt.target.value;
      setForms(newForm)
    }

    function submitForm() {
      fetch(`/api/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      .then(response => response.json())
      .then(data => {
        let newKeys = [...keys];
        newKeys.unshift({
          name: form.key, 
          value: form.value
        });

        setKeys([...newKeys]);
        setForms({key: null, value: null });
        setShow(false);
      })
    }

    function renderModal() {
      if (show) {
        return (
          <div>
              <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                  <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                      <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                          <div className="w-full flex justify-start text-gray-600 mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                              </svg>
                          </div>
                          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter New Item</h1>
                          <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                              Key
                          </label>
                          <input onChange={(evt) => formHandler(evt, 'key')} id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                          
                          <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                              Value
                          </label>
                          <input onChange={(evt) => formHandler(evt, 'value')} id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                          

                          <div className="flex items-center justify-start w-full">
                              <button onClick={() => submitForm()} className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                                Submit
                              </button>
                              <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={() => setShow(false)}>
                                  Cancel
                              </button>
                          </div>
                          <div onClick={() => setShow(false)} className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
                              <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" />
                                  <line x1={18} y1={6} x2={6} y2={18} />
                                  <line x1={6} y1={6} x2={18} y2={18} />
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
      }
    }

    return (
        <>
            { renderModal() } 
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Redis Web Client</p>
                        <div>
                            <button onClick={() => setShow(true)} className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
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
                              keys && keys.map((item, index) => {
                                return (
                                <tr key={index} className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                    <td className="pl-4 cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="pl-4">
                                                <p className="font-medium">{item.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="pl-4">
                                      { getButtonOrValue(item.name, item.value, index) }
                                    </td>
                                    <td className="pl-4">
                                      <button onClick={() => removeData(item.name, index)} className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                          <p className="text-sm font-medium leading-none text-white">Delete</p>
                                      </button>
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

