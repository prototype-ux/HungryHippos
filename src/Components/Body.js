import resList from "../utils/mockdataRestraunts";
import Shimmer from "./Shimmer";
import RestrauntCard, { RestrauntCardFast } from "./RestrauntCard";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import LoggedinUserContext from "../utils/LoggedinUserContext";
// let resList= [
//         {"info": {
//                 "id": "4138",
//                 "name": "Grand Hotel",
//                 "cloudinaryImageId": "g1arzw6qd7g9affkmgzk",
//                 "costForTwo": "₹300 for two",
//                 "cuisines": [
//                   "Biryani",
//                   "Chinese",
//                   "Tandoor",
//                   "Haleem"
//                 ],
//                 "avgRating": 4.2,
//               }},

//         {
//           "info": {
//             "id": "4139",
//             "name": "mcd",
//             "cloudinaryImageId": "g1arzw6qd7g9affkmgzk",
//             "costForTwo": "₹300 for two",
//             "cuisines": [
//               "Biryani",
//               "Chinese",
//               "Tandoor",
//               "Haleem"
//             ],
//             "avgRating": 3.1,
//           }
//         }]

const Body = () => {
  //debugger;

  const [restrauntList, setrestrauntList] = useState([]); //local state variable
  const [filteredrestrauntList, setfilteredrestrauntList] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  //console.log("rendered before encounter");
  //const [page, setPage] = useState(1);
  //const [loading, setLoading] = useState(false);

  //const arr=useState(resList)
  //const [restrauntList, setresList]=arr;
  useEffect(() => {
    fetchdata();
  }, []);
  // useEffect(()=>{
  //         window.addEventListener("scroll",handleScroll);
  //         return ()=>window.removeEventListener("scroll",handleScroll);

  // })
  // const handleScroll=()=> {
  //         if (
  //           window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading
  //         )
  //           setPage(page + 1);

  //       };
  // useEffect(()=>{
  // setLoading(true);
  // fetchdata();
  // },[page])
  //debugger;
  //console.log("rendered after encounter");
  //const {loggedInUser}=useContext(LoggedinUserContext);
  const { loggedInUser, setuserName } = useContext(LoggedinUserContext);
  //console.log(loggedInUser)

  const fetchdata = () => {
    //         const swiggyMenuAPI="https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    //     const corsURL='https://corsproxy.org/?'+encodeURIComponent(swiggyMenuAPI);
    //    console.log(corsURL)
    //   const data= await fetch(corsURL);
    // const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //    );
    // const json = await data.json();
    // console.log("data",data);
    // console.log("json",json);
    //console.log("..",json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //const newRestaurant =json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    //setrestrauntList((prevList)=>[...prevList,...newRestaurant])
    //setfilteredrestrauntList((prevList)=>[...prevList,...newRestaurant]);
    //setLoading(false)
    setrestrauntList(
      resList
      //json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilteredrestrauntList(resList
     // json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const RestaurantCardFastcomponent = RestrauntCardFast(RestrauntCard);
  //debugger;
  //conditional rendering
  //console.log("filteredrestrauntList",filteredrestrauntList);
  const onlinestatus = useOnlineStatus();
  //console.log("restrauntList ",restrauntList )
  //console.log("restrauntList.length ",restrauntList.length )
  if (onlinestatus === false)
    return <h1>Aww Snap!!! Looks like you lost your internet connection</h1>;
  return restrauntList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body ">
      <div className="filter flex ">
        <div className="p-4 ml-7 md:ml-8">
          <input
            data-testid="searchinput"
            className="border  border-solid border-black w-[18vw] md:w-[175px]"
            type="text"
            value={searchdata}
            onChange={(e) => {
              setsearchdata(e.target.value);
            }}
          ></input>
          <button
            className="searchbutton px:2 md:px-4 py-2 bg-green-100 m-4 rounded-lg w-[15vw] md:w-[100px]"
            onClick={() => {
              const filteredList = restrauntList.filter((res) =>
                res.info.name.toLowerCase().includes(searchdata.toLowerCase())
              );
              console.log(filteredList);
              filteredList.length === 0
                ? setfilteredrestrauntList(restrauntList)
                : setfilteredrestrauntList(filteredList);
            }}
          >
            Search
          </button>

          <button
            className="filter-btn px:0 md:px-4 py-2 whitespace-nowrap  bg-gray-100 m-0.5 md:m-4 rounded-lg w-[39vw] md:w-[200px]"
            onClick={() => {
              const filteredList = restrauntList.filter(
                (elements) => elements.info.avgRating > 4.4
              );
              //console.log(filteredList);
              setfilteredrestrauntList(filteredList);
              console.log("button clicked");
              //resList.map((Restaurant)=>(<RestrauntCard key={Restaurant.info.id} resData={Restaurant}/>))
            }}
          >
            Top rated restraunt
          </button>
          <label className="hidden md:inline"> User Name: </label>
          <input 
            className="border  pl-2 border-solid border-black hidden md:inline"
            value={loggedInUser}
            type="text"
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="flex flex-wrap mx-[5vw] md:mx-8">
        
        {filteredrestrauntList.map((Restaurant) => (
          <Link
            key={Restaurant.info.id}
            to={"/restaurant/" + Restaurant.info.id}
          >
            {Restaurant.info.sla.deliveryTime < 30 ? (
              <RestaurantCardFastcomponent resData={Restaurant} />
            ) : (
              <RestrauntCard resData={Restaurant} />
            )}
          </Link>
        ))}
        {/*loading && <Shimmer />*/}
      </div>
    </div>
  );
}; //onChange={(e)=>setuserName(e.target.value)}
export default Body;
