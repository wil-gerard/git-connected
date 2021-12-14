import React, { createContext, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'

const myContext = createContext({});

export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>()

    useEffect(() => {
        Axios.get("http://localhost4000/getuser").then((res: AxiosResponse) => {
            if (res.data) {
                setUserObject(res.data)
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}