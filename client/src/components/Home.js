import { Link } from 'react-router-dom';

const Home = () => {
    return (  
        <div className="jumbotron">
            <h1 className="display-4">Home</h1>
            <h2>Character Concept Creator for an Athens By Night Chronicle, by Stefanos Michalas.</h2>
            <p className="lead">Register as a user and click on 'Create new Kindred' to make your new vampire character! You can look at all your character concepts by clicking on 'Kindred'. If you want, you can also edit them and delete them. In order to create a new character, only the name, core concept and character start fields are required. Feel free to fill the rest of them later (or just contact me to finalize your idea).</p>
            <div className="btn-group">
                <Link className="btn btn-dark" to="/kindred">Kindred</Link>
                <Link className="btn btn-outline-dark" to="/create">Create new Kindred</Link>
            </div>
        </div>
    );
}
 
export default Home;