import React, {useContext, useEffect, useState} from 'react';
import './Navbar.css'
import {Link} from "react-router-dom";
import {PlaylistApiClient, UserApiClient} from "../../utils/ApiClientsInstances";
import {AuthorizationContext, PlaylistContext} from "../../context";
import {useFetching} from "../../hooks/useFetching";
import NavbarCategory from "./NavbarCategory";

const Navbar = () => {
    const {trigger} = useContext(PlaylistContext);
    const {setIsAuthorized} = useContext(AuthorizationContext);
    const [playlists, setPlaylist] = useState([]);
    const [fetchPlaylists, isLoading, error] = useFetching(async () => {
        const fetchedPlaylists = await PlaylistApiClient.all(localStorage.getItem('token'));
        setPlaylist(fetchedPlaylists);
    })

    useEffect(() => {
        fetchPlaylists();
    }, [trigger])

    const logout = (e) => {
        e.preventDefault();
        try {
            UserApiClient.logout(localStorage.getItem('token'));
        } catch (e) {
        }
        localStorage.removeItem('token');
        setIsAuthorized(false);
    }

    return (
        <div className="sidebar flex-shrink-0 p-1 bg-white" style={{width: "280px"}}>
            <a href="/src/pages" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <span className="fs-5 fw-semibold">Collapsible</span>
            </a>
            <ul className="list-unstyled ps-0">
                <NavbarCategory title="Tracks">
                    <li><Link to="/" className="link-dark rounded">All</Link></li>
                    <li><Link to="/upload" className="link-dark rounded">Upload</Link></li>
                </NavbarCategory>
                <NavbarCategory title="Playlists">
                            <li><Link to="/create/playlist" className="link-dark rounded">Create</Link></li>
                            {playlists.map(p =>
                                <li key={p.id}><Link to={`/playlist/${p.id}`} className="link-dark rounded">{p.name}</Link></li>
                            )}
                </NavbarCategory>
                <li className="border-top my-3"></li>
                <NavbarCategory title="Account">
                    <li><a onClick={logout} className="link-dark rounded">Sign out</a></li>
                </NavbarCategory>
            </ul>
        </div>
    );
};

export default Navbar;