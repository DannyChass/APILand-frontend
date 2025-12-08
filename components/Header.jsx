


export default function Header(){

    return(
        
            <header className="pr-10 pl-10 bg-white w-full h-20 items-center flex justify-between">
                <Link href="#" className="logo"> APIhub</Link>
                
                <div className="gap-5 justify-between flex">
                    <Button>Sign Up</Button>
                    <Button>Login</Button>
                </div>
            </header>
        
    )
}