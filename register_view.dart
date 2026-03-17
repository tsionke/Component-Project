// import 'dart:math' as devtools;

import 'package:alpha/constants/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'dart:developer'as devtools show log;

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
    late final TextEditingController _email;
  late final TextEditingController _password;
  @override
  void initState() {
    _email =TextEditingController();
    _password =TextEditingController();
    // TODO: implement initState
    super.initState();
  }
  @override
  void dispose() {
    _email =TextEditingController();
    _password =TextEditingController();
    // TODO: implement initState
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
      ),
      body: Column(
            children: [
              TextField(
                controller: _email,
                enableSuggestions: false,
                autocorrect: false,
                keyboardType: TextInputType.emailAddress,
                decoration: 
                const InputDecoration(
                  hintText: "enter your email"
                ),
              ),
              TextField(
                controller: _password,
                obscureText: true,
                enableSuggestions: false,
                autocorrect: false,
                decoration: 
                const InputDecoration(
                  hintText: "enter your passward"
                ),
              ),
            TextButton(
              onPressed: () async {
                
          
                final email = _email.text;
                final password = _password.text;
                try{
                  final userCredential=
                await FirebaseAuth.instance.createUserWithEmailAndPassword(
                  email: email,
                   password: password,
                   );
                   devtools.log(userCredential.toString());
                //  Navigator.of(context).pushNamedAndRemoveUntil(verifyEmailRoute,
                //    (route) =>  false);

                }on FirebaseAuthException catch (e){
                     if(e.code == 'week-password'){
                     devtools.log("week password");
                }else if(e.code == 'email-already-in-use'){
                 devtools.log('email already in use');
                  
                }else if (e.code == 'invalid-email entered'){
                  devtools.log("invalid email entered");
                }
                }
          
              }, 
              child: const Text('register'),
              ),
               TextButton(onPressed: () {
           Navigator.of(context).pushNamedAndRemoveUntil(
            loginRoute,
            (route) => false,
            );
         
       },
       child: const Text('Already registserd? Login here'),
       )
            ],
          ),
    );
  }
}
 