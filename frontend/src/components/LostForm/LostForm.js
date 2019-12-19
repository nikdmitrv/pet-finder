import React, { Component } from "react";
import { connect } from "react-redux";

import {
  createLostAdvertAC,
  clearMessageAC,
  warningMessageAC
} from "../../redux/actions";
import Maps from "../Maps/Maps";

class LostForm extends Component {
  state = {
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
    ]
  };

  handleImageUpload = event => {
    event.preventDefault();
    const imgData = new FormData();
    imgData.append("file", event.target.files[0]);
    this.setState({ imgData });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (
      event.target.locationLat.value === "" ||
      event.target.locationLng.value === ""
    ) {
      this.props.warningMessage(
        "Укажите на карте место, где вы потеряли животное"
      );
    } else {
      const {
        dogBreed,
        dogDescription,
        dogSex,
        locationLat,
        locationLng
      } = event.target;

      const request = {
        method: "POST",
        body: this.state.imgData
      };

      const advert = {
        dogData: {
          breed: dogBreed.value,
          description: dogDescription.value,
          sex: dogSex.value
        },
        location: { lat: locationLat.value, lng: locationLng.value },
        id: this.props.user._id
      };

      if (this.state.imgData) {
        fetch("/api/images/", request)
          .then(response => response.json())
          .then(data => this.props.createLostAdvert(advert, data.filename))
          .then(() => (window.location = "/account/" + this.props.user._id));
      } else {
        this.props
          .createLostAdvert(advert, "placeholder.jpg")
          .then(() => (window.location = "/account/" + this.props.user._id));
      }
    }
  };

  getLocation = location => {
    document.getElementById("location-input-lat").value = location.lat;
    document.getElementById("location-input-lng").value = location.lng;
  };

  render() {
    return (
      <div>
        <h1>Добавить объявление о пропаже</h1>
        <br></br>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="dog-breed">Порода:</label>
          <select
            onChange={this.handleInput}
            name="dogBreed"
            className="form-control"
          >
            <option value="">Выберите породу</option>
            {this.state.breedOptions.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <div className="form-group">
            <label htmlFor="dog-description">Пол:</label>
            <label htmlFor="sexFilterMale">М</label>
            <input type="radio" name="dogSex" id="sexFilterMale" value="М" />
            <label htmlFor="sexFilterFemale">Ж</label>
            <input type="radio" name="dogSex" id="sexFilterFemale" value="Ж" />
          </div>
          <label htmlFor="dog-description">Описание собаки:</label>
          <div className="form-group">
            <textarea
              onChange={this.handleInput}
              name="dogDescription"
              id="dog-description"
              type="text"
              style={{ resize: "none", height: "100px", width: "300px" }}
              required
            />
          </div>

          <input
            className="form-control"
            id="location-input-lat"
            name="locationLat"
            hidden
            value=""
          ></input>
          <input
            id="location-input-lng"
            name="locationLng"
            hidden
            value=""
          ></input>

          <button className="btn btn-primary">Отправить</button>
        </form>
        <form>
          <input
            onChange={this.handleImageUpload}
            type="file"
            name="imgInput"
          />
        </form>
        <div className="error-message">{this.props.message}</div>
        <Maps getLocation={this.getLocation} />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    message: store.message
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createLostAdvert: (advert, image) =>
      dispatch(createLostAdvertAC(advert, image)),
    clearMessage: () => dispatch(clearMessageAC()),
    warningMessage: message => dispatch(warningMessageAC(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LostForm);
