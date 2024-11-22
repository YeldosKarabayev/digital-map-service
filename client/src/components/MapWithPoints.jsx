import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark, Clusterer } from '@pbe/react-yandex-maps';
import icon from '../image/kcell-icon.png'



const MapWithPoints = () => {

  // Массив с точками сотовой связи
 const operators = [  
        { id: 1, name: 'Point 1', coordinates: [42.355201, 69.558085] },
        { id: 2, name: 'Point 2', coordinates: [42.349170, 69.606002] },
        { id: 3, name: 'Point 3', coordinates: [42.450008, 69.545824] },
        { id: 4, name: 'Point 4', coordinates: [42.425034, 69.577965] },
        { id: 5, name: 'Point 5', coordinates: [42.422104, 69.568127] },
        { id: 6, name: 'Point 6', coordinates: [42.422104, 69.579026] },
        { id: 7, name: 'Point 7', coordinates: [42.433823, 69.637188] },
        { id: 8, name: 'Point 8', coordinates: [42.426106, 69.613364] },
        { id: 9, name: 'Point 9', coordinates: [42.430063, 69.625975] },
        { id: 10, name: 'Point 10', coordinates: [42.429025, 69.644407] },
        { id: 11, name: 'Point 11', coordinates: [42.414538, 69.549662] },
        { id: 12, name: 'Point 12', coordinates: [42.416934, 69.595903] },
        { id: 13, name: 'Point 13', coordinates: [42.417781, 69.683167] },
        { id: 14, name: 'Point 14', coordinates: [42.404587, 69.560222] },
        { id: 15, name: 'Point 15', coordinates: [42.401547, 69.551121] },
        { id: 16, name: 'Point 16', coordinates: [42.410097, 69.592139] },
        { id: 17, name: 'Point 17', coordinates: [42.412661, 69.617775] },
        { id: 18, name: 'Point 18', coordinates: [42.408957, 69.618544] },
        { id: 19, name: 'Point 19', coordinates: [42.402174, 69.581320] },
        { id: 20, name: 'Point 20', coordinates: [42.401699, 69.598112] },
        { id: 21, name: 'Point 21', coordinates: [42.400559, 69.598240] },
        { id: 22, name: 'Point 22', coordinates: [42.405879, 69.606828] },
        { id: 23, name: 'Point 23', coordinates: [42.409153, 69.619096] },
        { id: 24, name: 'Point 24', coordinates: [42.405544, 69.618327] },
        // Другие точки оператора 1...
 ]
      
    // Другие операторы...
 

 // 42.355201, 69.558085
 // 42.349170, 69.606002
 // 42.345706, 69.627971
 // 42.342029, 69.640051


  return (

     <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY }}>
      <Map
        defaultState={{ center: [42.349170, 69.606002], zoom: 13}}
        width="100%"
        height="605px"
      >
        <Clusterer 
             options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
        >
          {operators.map((operator) =>

              <Placemark
                key={operator.id}
                geometry={operator.coordinates}
                options={{
                  iconImageHref: icon,
                  iconLayout: 'default#image',
                  iconImageSize: [100, 100],
                  iconImageOffset: [-16, -16],
                }}
              />
          )}
        </Clusterer>
      </Map>
    </YMaps>


  );
};

export default MapWithPoints;