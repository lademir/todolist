import { destroyCookie, parseCookies, setCookie } from 'nookies'

export function setCookies(name: string, value: any) {
    setCookie(undefined, name, value, {
        maxAge: 60 * 60 * 24 * 30 //30 days
    } )   
}