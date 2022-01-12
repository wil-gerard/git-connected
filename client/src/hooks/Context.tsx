import React, { createContext, useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'

export const myContext = createContext({});

export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>()

    useEffect(() => {
        Axios.get("https://git-connected.herokuapp.com/getuser", { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                console.log(res.data)      
                setUserObject(res.data)
            }
        })
    }, [])
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}