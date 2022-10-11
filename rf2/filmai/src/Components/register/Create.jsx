import { useState, useContext } from 'react';
import Register from '../../Contexts/Register';


function Create() {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    const { setCreateUser } = useContext(Register);

    const add = () => {
        setCreateUser({
            name,
            pass
        });
        setName('');
        setPass('');
        setPass2('');
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">Register</h5>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password 2</label>
                    <input type="password" className="form-control" value={pass2} onChange={e => setPass2(e.target.value)} />
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Register</button>
            </div>
        </div>
    );
}

export default Create;