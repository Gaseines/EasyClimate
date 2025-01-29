import React, { useEffect, useRef } from "react";

//Styles
import styles from "./Card.module.css";

//hooks
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

//images
import logo from "../image/logo.png";
import lupa from "../image/lupa.png";

const Card = () => {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("Sao Paulo");
  const [data, loading] = useFetch(city);
  const [dataReverse, setDataReverse] = useState("");
  const [hora, setHora] = useState("");

  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    setCity(inputCity);
    setInputCity("");
  };

  useEffect(() => {
    if (data.current) {
      const anoMesDia = data.location.localtime;
      const [date, hour] = anoMesDia.split(" ");
      const dataInvert = date.split("-").reverse().join("/");
      setDataReverse(dataInvert);
      setHora(hour);
    }
  }, [data]);

  function openMenu(){
    setMenuOpen(!menuOpen)
    console.log(menuOpen)
  }

  return (
    <div className={styles.card}>
      <nav ref={navRef} className={`${styles.c_nav} ${menuOpen ? styles.open : ""}`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.search}>
            <input
              type="text"
              name="search"
              autoComplete="off"
              placeholder="Digite o nome da sua cidade..."
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
            />
            <button type="submit">
              <img src={lupa} alt="lupa"/>
            </button>
          </div>
        </form>

        {data && data.current && (
          <div className={styles.dado_menu}>
            <h1>{data.location.name}</h1>
            <p>{data.location.region}</p>
            <p className={styles.lat_lon}>
              {data.location.lat} {data.location.lon}
            </p>

            <h2>Temperatura</h2>
            <p>Atual: {data.current.temp_c}°</p>
            <p>
              Sensação térmica:{" "}
              <span
                style={{
                  color:
                    data.current.feelslike_c > data.current.temp_c
                      ? "rgb(255, 95, 95)"
                      : "rgb(42, 151, 253)",
                }}
              >
                {data.current.feelslike_c}°
              </span>
            </p>

            <h2>Tempo</h2>

            <p>{data.current.condition.text}</p>
            <img src={data.current.condition.icon} alt="Icone Tempo" />
            <p className={styles.wind}>
              Vento: {data.current.wind_kph}kph{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#4a90e2"
                fill="none"
              >
                <path
                  d="M21 5.63247C19.8635 4.81397 18.4095 4.81397 17.273 5.63247C16.5877 6.13474 15.6685 6.11614 14.9833 5.61388C13.8468 4.79537 12.3928 4.79537 11.273 5.61388C10.571 6.11614 9.68524 6.11614 9 5.61388"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3 9.37672C4.16839 10.1953 5.66323 10.1953 6.83162 9.37672C7.53608 8.87443 8.46392 8.87443 9.16838 9.37672C10.3368 10.1953 11.8488 10.2139 13 9.39531"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M21 14.6233C19.8635 13.8047 18.4095 13.8047 17.273 14.6233C16.5877 15.1256 15.6852 15.1256 15 14.6233C13.8635 13.8047 12.3928 13.7861 11.273 14.6047C10.571 15.107 9.68524 15.107 9 14.6047"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3 18.3767C4.16839 19.1953 5.66323 19.1953 6.83162 18.3767C7.53608 17.8744 8.46392 17.8744 9.16838 18.3767C10.3368 19.1953 11.8488 19.2139 13 18.3953"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </p>

            <p>
              Umidade:{" "}
              <span style={{ color: "#4A90E2" }}>{data.current.humidity}%</span>
            </p>

            <p>Nuvens: {data.current.cloud}%</p>
          </div>
        )}
      </nav>
      <div className={styles.header}>
        <img className={styles.c_logo} src={logo} alt="Logo Easy Climate" />
        <svg
          className={`${styles.burguer} ${menuOpen ? styles.burguer_open : "teste"}`}
          onClick={openMenu}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="28"
          height="28"
          color="#ffffff"
          fill="none"
        >
          <path
            d="M4 5L20 5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 12L20 12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 19L20 19"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      {loading && <p>Carregando...</p>}
      {data && data.current && (
        <div className={styles.info}>
          <p className={styles.i_celsius}>{data.current.temp_c}°</p>
          <div className={styles.i_2}>
            <div className={styles.name_and_day}>
              <p className={styles.i_cidade}>{data.location.name}</p>
              <p>
                {dataReverse} {hora}
              </p>
            </div>
            <div className={styles.i_days}>
              {data.forecast &&
                data.forecast.forecastday.map((day) => {
                  const formattedDate = new Date(day.date).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  );

                  return (
                    <div className={styles.i_3} key={day.date}>
                      <p className={styles.date}>{formattedDate}</p>
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt="Ícone do clima"
                      />
                      <p className={styles.i_max_min}>
                        <span className={styles.warm}>
                          {day.day.maxtemp_c}°
                        </span>{" "}
                        |
                        <span className={styles.cold}>
                          {" "}
                          {day.day.mintemp_c}°
                        </span>
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
