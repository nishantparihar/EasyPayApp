import {atom, selector} from 'recoil';


export const username = atom({
    key: "username",
    default: ""
})

export const firstName = atom({
    key: "firstName",
    default: ""
})

export const lastName = atom({
    key: "lastName",
    default: ""
})

export const password = atom({
    key: "password",
    default: ""
})

export const usersAtom = atom({
    key: "usersAtom",
    default:[]
})

export const userBalance = atom({
    key: "userBalance",
    default: 0
})
