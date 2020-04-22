import React from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import  formStyles from '../Subscription/Subscription.module.scss'

export default class Subscription extends React.Component {
    state = {
        email:'',
        name:'',
        isSubscribed:false
        
    }

    _handleChange = (e) => {
       
        this.setState({
            [`${e.target.name}`]: e.target.value,
        });
    }

    _handleSubmit = (e) => {
        e.preventDefault();
    
        addToMailchimp(this.state.email,{NAME:this.state.name})
        .then(data=>{
         this.state.isSubscribed=true
          console.log(data);
         
        })
        .catch((error) => {
          // Errors in here are client side
          // Mailchimp always returns a 200
        });
     }

    render() {
        return (
            <div>
                <div>
                    <form className={formStyles.EmailListForm}  onSubmit={this._handleSubmit} >
                    <input
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this._handleChange(event)}
                            placeholder="e-mail"
                            name="email"
                            required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+`?\.[a-z]{2,4}$'
                             />
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={(event) => this._handleChange(event)}
                            placeholder="Name"
                            name="name"
                        />
                        
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
        );
    }
}