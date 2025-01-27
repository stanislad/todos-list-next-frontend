import { useRouter } from "next/navigation"
import { RegisterMutation } from "../query/mutations";
import { useState } from "react";

export const Registration = () => {
    const router = useRouter()
    const {mutate} = RegisterMutation()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cpassword, setCPassword] = useState<string>("")


    const submit = (e: any) => {
        e.preventDefault();
        if(!email || !password){
          alert('Missing Field(s)!')
          return;
        }
        if(password !== cpassword){
          alert('Password do not match!')
          return;
        }

        mutate({email, password})
    }

    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-12">
          <a href="javascript:void(0)">
            <img src="./to-do-list.png" alt="logo" className='mx-auto h-14 w-auto' />
          </a>
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input 
              value={email}
              onChange={e=>setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Enter email" 
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input 
              value={password}
              onChange={e=>setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Enter password" 
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input 
              value={cpassword}
              onChange={e=>setCPassword(e.target.value)}
              id="cpassword"
              name="cpassword"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Enter confirm password" 
              />
            </div>

            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                I accept the <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div className="!mt-8">
            <button 
            onClick={e=>submit(e)} 
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create an account
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? 
            <a onClick={()=>router.push('login')} className="font-semibold text-indigo-600 hover:text-indigo-500"> Login here</a>
          </p>
        </form>
      </div>
    </div>
    )
}