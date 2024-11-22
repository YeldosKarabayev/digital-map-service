import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Clusterer, ZoomControl, Polyline } from '@pbe/react-yandex-maps';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { operators } from '../data/operators'
import { companiesData } from '../app/api/lineCompany'


const MapComponent = () => {

  const [selectedOperators, setSelectedOperators] = useState([]);
  const [enabledLines, setEnabledLines] = useState({});
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия выпадающего списка

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Изменяем состояние открытия/закрытия при клике
  };

  const handleOperatorToggle = (operatorId) => {
    if (selectedOperators.includes(operatorId)) {
      setSelectedOperators(selectedOperators.filter((id) => id !== operatorId));
    } else {
      setSelectedOperators([...selectedOperators, operatorId]);
    }
  };



  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Обработчик изменения состояния выбранных компаний
  const handleCompanyToggle = (companyIndex) => {
    setSelectedCompanies(prevState => {
      if (prevState.includes(companyIndex)) {
        return prevState.filter(item => item !== companyIndex);
      } else {
        return [...prevState, companyIndex];
      }
    });
  };



  return (
    <>
      <div className="map-container">
        <YMaps>
          <Map
            defaultState={{ center: [42.349170, 69.606002], zoom: 13 }}
            className='map-block'
            options={{ suppressMapOpenBlock: true }}

          >
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                clusterDisableClickZoom: true,
                groupByCoordinates: false,
              }}
            >
              {operators.map((operator) => {
                if (selectedOperators.includes(operator.id)) {
                  return operator.points.map((point) => (
                    <Placemark
                      key={point.id}
                      geometry={point.coordinates}
                      properties={{
                        balloonContent: point.name,
                      }}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref: operator.pointIcon,
                        iconImageSize: [100, 100],
                        iconImageOffset: [-24, -48],
                      }}
                    />
                  ))
                }
                return null
              })}
            </Clusterer>
            {companiesData.map((company, companyIndex) => (
              selectedCompanies.includes(companyIndex) && company.lines.map((line, lineIndex) => (
                <Polyline
                  key={`${companyIndex}-${lineIndex}`}
                  geometry={line.coordinates}
                  options={{
                    balloonCloseButton: false,
                    strokeColor: line.color,
                    strokeWidth: 3,
                    strokeOpacity: 0.6,
                  }}
                />
              ))
            ))}
            <ZoomControl options={{ float: 'right' }} />
          </Map>
        </YMaps>
        <div className="filter-container">
          <div className='filter_top'>
            <p style={{ marginTop: "12px", fontSize: "18px", fontWeight: "600", textAlign: 'center' }}>Фильтр операторов <br /> и компаний</p>
          </div>
          <div style={{ display: "grid", marginTop: "-110px" }}>
            <label style={{ marginRight: "30px", marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(1)}
                onChange={() => handleOperatorToggle(1)}
              />
              Kcell 5G
            </label>
            <label style={{ marginRight: "30px", marginLeft: "10px" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(2)}
                onChange={() => handleOperatorToggle(2)}
              />
              Kcell БС
            </label>
            <label style={{ marginRight: "30px", marginLeft: "10px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(3)}
                onChange={() => handleOperatorToggle(3)}
              />
              Кар-Тел БС
            </label>
            <label style={{ marginRight: "30px", marginLeft: "10px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(4)}
                onChange={() => handleOperatorToggle(4)}
              />
              Kcell АМС
            </label>
            <label style={{ marginRight: "30px", marginLeft: "10px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(5)}
                onChange={() => handleOperatorToggle(5)}
              />
              Қоғамдық Wi-Fi
            </label>
            <label style={{ marginRight: "30px", marginLeft: "10px", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={selectedOperators.includes(6)}
                onChange={() => handleOperatorToggle(6)}
              />
              Beeline АМС
            </label>

            <div
              className='dropdown_button'
              onClick={toggleDropdown}>
              Оптоволоконный кабель
            </div>

            {isOpen && (
              <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                {companiesData.map((company, index) => (
                  <label
                    style={{ marginRight: "30px", marginLeft: "10px", alignItems: "center" }}
                    key={index}>
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(index)}
                      onChange={() => handleCompanyToggle(index)}
                    />
                    {company.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
};



export default MapComponent