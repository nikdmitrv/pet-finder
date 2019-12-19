import React, { Component } from "react";
import axios from "axios";

import Map from "../Maps/Maps";

export default class EditLostDog extends Component {
  constructor(props) {
    super(props);

    // this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    // this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      breedOptions: [
        "Акита-ину",
        "Алабай",
        "Аляскинский Маламут",
        "Американская Акита",
        "Американский бульдог",
        "Американский стаффордширский терьер",
        "Английский бульдог",
        "Афганская борзая",
        "Американский кокер спаниель",
        "Английский кокер спаниель",
        "Английский мастиф",
        "Английский пойнтер",
        "Басенджи",
        "Бассет Хаунд",
        "Без породы",
        "Бернский зенненхунд",
        "Бигль",
        "Бишон фризе",
        "Бладхаунд",
        "Бобтейл",
        "Боксер",
        "Болгарская овчарка",
        "Бордер колли",
        "Бордоский дог",
        "Босерон",
        "Бостон терьер",
        "Бриар",
        "Брюссельский гриффон",
        "Бульмастиф",
        "Бультерьер",
        "Веймаранер",
        "Вельш корги пемброк",
        "Вест хайленд уайт терьер",
        "Вельштерьер",
        "Далматинец",
        "Джек рассел терьер",
        "Доберман",
        "Дратхаар",
        "Золотистый ретривер",
        "Ирландский волкодав",
        "Ирландский сеттер",
        "Ирландский терьер",
        "Итальянская левретка",
        "Йоркширский терьер",
        "Кавказская овчарка",
        "Кане корсо",
        "Карликовый пинчер",
        "Кавалер кинг чарльз спаниель",
        "Кеесхонд",
        "Колли",
        "Китайская хохлатая собака",
        "Курцхаар",
        "Королевский пудель",
        "Карликовый пудель",
        "Лабрадор ретривер",
        "Лайка",
        "Мальтийская болонка",
        "Московская сторожевая",
        "Миттельшнауцер",
        "Мопс",
        "Немецкий дог",
        "Ньюфаундленд",
        "Немецкая овчарка",
        "Норвич-терьер",
        "Папильон",
        "Пекинес",
        "Померанский шпиц",
        "Пшеничный терьер",
        "Родезийский риджбек",
        "Ризеншнауцер",
        "Ротвейлер",
        "Русская борзая",
        "Самоед",
        "Сенбернар",
        "Сибирские хаски",
        "Скотч терьер",
        "Стаффордширский Бультерьер",
        "Такса",
        "Той пудель",
        "Той терьер",
        "Уиппет",
        "Фараонова собака",
        "Фокстерьер гладкошерстный",
        "Фокстерьер жесткошерстный",
        "Французский бульдог",
        "Цвергшнауцер",
        "Чау Чау",
        "Черный русский терьер",
        "Шарпей",
        "Шелти",
        "Шиба-ину",
        "Ши-тцу",
        "Эрдельтерьер",
        "Южноафриканский бурбуль",
        "Ягдтерьер",
        "Японский хин"
      ],
      breed: "",
      description: "",
      sex: "",
      date: "",
      image: ""
      // location: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/lost/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          breed: response.data.dogData.breed,
          description: response.data.dogData.description,
          sex: response.data.dogData.sex,
          date: response.data.dogData.date,
          image: response.data.dogData.image
          // location: response.data.location,
        });
        //   console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // onChangeBreed(e) {
  //   this.setState({
  //     breed: e.target.value
  //   });
  // }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }
  // onChangeLocation(e) {
  //     this.setState({
  //         location: e.target.value
  //     })
  // }

  deleteLostDog(id) {
    axios
      .delete("http://localhost:5000/api/lost/" + this.props.match.params.id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      breed: "",
      description: "",
      sex: "",
      date: ""
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const dog = {
      breed: e.target.dogBreed.value,
      description: this.state.description,
      sex: e.target.dogSex.value,
      date: this.state.date,
      location: {
        lat: e.target.locationLat.value,
        lng: e.target.locationLng.value
      }
    };
    console.log(dog);

    axios
      .post(
        "http://localhost:5000/api/lost/update/" + this.props.match.params.id,
        dog
      )
      .then(res => console.log(res.data));

    // window.location= '/'
  }

  getLocation = location => {
    document.getElementById("location-input-lat").value = location.lat;
    document.getElementById("location-input-lng").value = location.lng;
  };

  render() {
    return (
      <>
        <h3>Редактировать данные о собаке</h3>
        <div className="editFound">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Порода: </label>
              <select  name="dogBreed" className="form-control">
            <option value="">Выберите породу</option>
            {this.state.breedOptions.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
            </div>

            <div className="form-group">
              <label htmlFor="dog-description">Пол:</label>
              <label htmlFor="sexFilterMale">М</label>
              <input type="radio" name="dogSex" id="sexFilterMale" value="М" />
              <label htmlFor="sexFilterFemale">Ж</label>
              <input type="radio" name="dogSex" id="sexFilterFemale" value="Ж" />
            </div>

            <div className="form-group">
              <label>Описание: </label>
              <textarea
                type="text"
                required
                className="form-control"
                style={{ resize: "none", height: "100px", width: "400px" }}
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>Дата: </label>
              <input
                type="date"
                required
                className="form-control"
                value={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>


            <input
              id="location-input-lat"
              name="locationLat"
              hidden
              required
            ></input>
            <input id="location-input-lng" name="locationLng" hidden></input>

            <div className="form-group">
              <button className="btn btn-primary btn-edit">Подтвреди изменения</button>



            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-edit"
                type="button"
                onClick={() => {
                  this.deleteLostDog(this.state._id);
                }}
              >
                Удалить объявление
          </button>
            </div>
          </form>

       
          <Map getLocation={this.getLocation} />
        </div>
      </>
    );
  }
}
