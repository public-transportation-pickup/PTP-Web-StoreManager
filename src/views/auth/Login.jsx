import { useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../../firebase.js'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Actions,useAPIRequest } from '../../libs/Commons/api-request.js';
import { authentication } from '../../api/auth-api.js';
import { useFormik } from "formik";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userLogin } from '../../redux/features/authSlice.js';
import {useAuth} from './AuthProvider.jsx';

function Login() {
   const {user, login } = useAuth();
   const [loginState,requestLogin]=useAPIRequest(authentication);
   const navigate = useNavigate()

  // const {currentUser}= useSelector(state=>state.auth);

  //  const userInfor=useSelector(selectUserInfor);
  //  const navigate = useNavigate()
  //  const dispatch = useDispatch()
  //  const { loading, userInfo, error } = useSelector((state) => state.auth)
// -----

  useEffect(()=>{
    // console.log(user);
    if(user){
      // console.log(user.user.storeId);
      return navigate(`/stores/${user.user.storeId}`)
    }
  },[user])

  const formik = useFormik({
    initialValues: {email: "store55@gmail.com", password: "@Abcaz12345"} ,
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Please enter email address.";
        toast.warning("Please enter email address.",{autoClose:900});
      }
      if (!values.password) {
        errors.password = "Please enter password.";
      }
      return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
       handleSubmitSignIn(values);
    },
  });

  const handleSubmitSignIn= async (model) =>{
    try {
          // console.log(model);

          const auth = getAuth(app);
          if(model.email.includes('store')){
            const userCredential= await signInWithEmailAndPassword(auth, model.email, model.password)
            // Signed up 
           // const user = userCredential.user;
            // console.log("user credetial:",userCredential.user.accessToken);
          
            // dispatch(userLogin(userCredential.user.accessToken));
            requestLogin(
              userCredential.user.accessToken
            );
           
          }else{
            console.log("No 'store' in email");
            toast.warning("Email or password is invalid",{autoClose:900});
          }
        
        } catch (error) {
          toast.warning("Login fail!",{autoClose:900});
          console.log("Sign In fail:",error);
        }
  }

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate('/')
  //   }
  // }, [navigate, currentUser])

  useEffect(() => {
    if (loginState.status !== Actions.loading) {
      formik.setSubmitting(false);
    }
    if (loginState.status === Actions.success) {
      login(loginState.payload);
      //console.log("Login ok");
    }
  }, [loginState]);


  
  return (
    <>
      <ToastContainer className="w-100 h-10"/>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center">
                  <h6 className="text-700 text-xl font-bold">
                    Sign in
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-slate-50 text-slate-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={pic1}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-slate-50 text-slate-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={pic2}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-slate-300" /> */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-slate-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      id='email'
                      //required
                      name='email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      //error={formik.errors.email}
                      // onChange={handleChange}
                    />         
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-slate-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      //required
                      id='password'
                      // onChange={handleChange}
                      name='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      //error={formik.errors.password}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-slate-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      // type="button"
                      // onClick={handleSubmitSignIn}
                      type="submit" 
                      // disabled={formik.isSubmitting} 
                      // loading={formik.isSubmitting}
                    >
                      Sign In
                      {/* {loading?'Sign In' : 'Sign In ...'} */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-slate-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-slate-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;