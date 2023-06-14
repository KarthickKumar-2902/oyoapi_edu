 Oyo Project

>>>>Page-1
    > List of state
    > List of cities for each state
    > list of cities for all cities

>>>>Page-2
    > Rooms wrt to date and time
    > Rooms wrt to date and time + City
    > Rooms wrt to date and time + City + cost.

>>>>Page-3
    > Details of rooms(Description)
    > Types of rooms 
    > Meal during your stay
    > Booking the room (post)
    
>>>>Page-4(payment page)
    > Details of room selected.
    
>>>>Page-5
    > List of bookings,
    > Update booking details,
    > Delete bookings.



db.rooms.updateOne(
    {"_id" : ObjectId("648891f50bd71d9fa394a86a")},
    {
        $set:{
            "amenities": [
        {
          "amenity_id": 1,                                                           
          "amenity_name": "Free Wifi"
        },
        {
          "amenity_id": 2,
          "amenity_name": "AC"
        },
        {
          "amenity_id": 3,
          "amenity_name": "TV"
        },
        {
          "amenity_id": 4,
          "amenity_name": "King Sized Bed"
        },
        {
          "amenity_id": 5,
          "amenity_name": "Queen Sized Bed"
        },
        {
          "amenity_id": 6,
          "amenity_name": "Parking facility"
        }
      ],
        }
    }
)



"_id" : ObjectId("648891f50bd71d9fa394a867")

"_id" : ObjectId("648891f50bd71d9fa394a868")

"_id" : ObjectId("648891f50bd71d9fa394a869")

"_id" : ObjectId("648891f50bd71d9fa394a86a")
