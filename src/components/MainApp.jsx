import React, { useContext, useEffect, useState } from 'react';
import { InputArea } from './InputArea';
import { ListItems } from './ListItems';
import cartImage from '../assets/_187be125-6fec-4cd6-9e8f-419e899bafd0.jpg';
import { database } from '../firebase/config';
import { Authcontext } from '../context/Authcontext';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref, push, update, remove } from 'firebase/database';
import { cartAuth } from '../firebase/config';

export const MainApp = () => {
  const { currentuser, logoutFn } = useContext(Authcontext);
  const [cartArray, setCartArray] = useState([]);
  const [item, setItem] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Handlechange = (e) => {
    setItem(e.target.value);
  }

  const HandleAddItem = (e) => {
    e.preventDefault();
    if (currentuser) {
      if (item === '') {
        setError('Please enter the name of the item');
        return;
      }
      setError('');
      push(ref(database, `cartItems/${currentuser.uid}`), { item: item, isPurchased: false });
      setItem('');
    }
  }

  const handleComplete = (id, currentStatus) => {
    if (currentuser) {
      const updatedStatus = !currentStatus;
      update(ref(database, `cartItems/${currentuser.uid}/${id}`), { isPurchased: updatedStatus });
    }
  }

  const handleDelete = (event, id) => {
    if (currentuser) {
      const parent = event.currentTarget;
      parent.classList.add("fall");
      parent.addEventListener("transitionend", e => {
        // console.log("Transition ended:", e.propertyName);
        // console.log("Trying to delete item", id);
        remove(ref(database, `cartItems/${currentuser.uid}/${id}`));
      });
    }
  }

  const fetchCartData = () => {
    if (currentuser) {
      onValue(ref(database, `cartItems/${currentuser.uid}`), (snapshot) => {
        if (snapshot.exists()) {
          let itemsArray = Object.entries(snapshot.val());
          setCartArray(itemsArray);
        } else {
          // console.log("No data for this user");
          setCartArray([]);
        }
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (currentuser) {
      setLoading(true);
      fetchCartData();
    }
  }, [currentuser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(cartAuth, (user) => {
      if (user) {
        setLoading(true);
        fetchCartData();
      } else {
        setLoading(false);
        setCartArray([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const HandleLogout = async () => {
    try {
      setError('');
      setLoading(true);
      await logoutFn();
      navigate('/login');
    } catch {
      setError('unable to log out');
    }
  }

  useEffect(() => {
    if (!currentuser) {
      // Redirect to login if the user is not authenticated
      navigate('/login');
    }
  }, [currentuser, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {currentuser ? (
        <div className="container">
          <div className='Img'>
            <img src={cartImage} alt="" />
          </div>
          <InputArea Handlechange={Handlechange} HandleAddItem={HandleAddItem} item={item} />
          <ul className="list-items">
            {cartArray.map((items) => (
              <ListItems items={items} handleComplete={handleComplete} handleDelete={handleDelete} key={items[0]} />
            ))}
          </ul>
          <button onClick={HandleLogout}>Logout</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : null}
    </>
  )
}
