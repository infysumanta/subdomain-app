import { notFound } from 'next/navigation'


export default function DomainPage({params}:{params:{domain:string}}){

    const subdomain = ["app", "test", "sumanta"]

    const isDomainExists = subdomain.includes(params.domain)
    if(!isDomainExists){
        notFound()
    }

    return <h1>{params.domain}</h1>


    
}