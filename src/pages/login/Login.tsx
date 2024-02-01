import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/shared/contexts/AuthContext';
import { useForm } from 'react-hook-form'
import  Swal from "sweetalert2";
import logo from './logo.png'

interface handleForm{
    email: string
    password: string
}

export const Login = () => {
    const navigate = useNavigate()
    const { authenticateUser } = useContext(AuthContext)
    const { register, handleSubmit } = useForm<handleForm>()

    async function handleSignIn(data:handleForm){
        console.log(data)   
        if(!data.email){
            Swal.fire({
				title: "Erro",
				text: "Preencha o campo de E-mail corretamente",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return;
        }
        if(!data.password){
            Swal.fire({
				title: "Erro",
				text: "Preencha o campo de senha corretamente",
				icon: "error",
				confirmButtonText: "Ok",
			});
			return;
        }
        if(data.email && data.password){
            try {
                const response = await authenticateUser(data);    
            } catch (error) {
                console.error("Erro de autenticação:");
                Swal.fire({
                    title: "Erro",
                    text: "Credenciais inválidas, verifique seu email ou senha!!",
                    icon: "error",
                    confirmButtonText: "Ok",
                });
            }
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-zinc-600">
            <form className="max-w-lg w-full bg-zinc-100 shadow-xl rounded-lg p-20 mb-7" onSubmit={handleSubmit(handleSignIn)}>
                <img className="w-56 mb-11 mx-auto" src={logo} alt="logo" />
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="roudened-md shadow-sm -space-y-1  relative">
                    <input 
                        id="email-address"
                        autoComplete="email"
                        type="email"
                        className="z-30 bg-transparent appearance-none rounded-md relative block w-full px-3 py-2 border border-blue-600 focus:outline-none focus:ring-1 focus:border-blue-600 peer"
                        placeholder="" 
                        {...register('email')}
                     />
                    <label htmlFor="email-address" className="select-none font-semibold absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3.5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-110 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Email
                    </label>
              </div>
              <div className="roudened-md shadow-sm -space-y-1 relative mt-5 mb-5">
                <input
                id="password"
                type="password"
                autoComplete="password"
                className="z-30 bg-transparent appearance-none font-semibold rounded-md relative block w-full px-3 py-2 border border-blue-600 focus:outline-none focus:ring-1 focus:border-blue-600 peer"
                placeholder=""
                {...register('password')}
                />
                <label htmlFor="password" className="select-none font-semibold absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3.5 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-110 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                    Senha
                </label>
              </div>
              <div className="-space-y-1 relative mt-5">
              <button className="group relative w-full flex justify-center py-2 px-4 mt-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Entrar</button>
                </div>
            </form>
        </div>
    )
}

export default Login