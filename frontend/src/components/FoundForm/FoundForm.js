import React, { Component } from "react";
import { connect } from "react-redux";

import { createFoundAdvertAC } from "../../redux/actions";
import Maps from "../Maps/Maps";

class FoundForm extends Component {
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
    imgData.append("file", event.target.imgInput.files[0]);
    this.setState({ imgData });
  };
  handleSubmit = event => {
    event.preventDefault();

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

    if (this.state.imgData) {
      fetch("/api/images/", request)
        .then(response => response.json())
        .then(data => {
          const advert = JSON.stringify({
            dogData: {
              breed: dogBreed.value,
              description: dogDescription.value,
              sex: dogSex.value,
              image: data.filename
            },
            location: { lat: locationLat.value, lng: locationLng.value },
            id: this.props.user._id
          });
          this.props.createFoundAdvert(advert);
        });
    } else {
      const advert = JSON.stringify({
        dogData: {
          breed: dogBreed.value,
          description: dogDescription.value,
          sex: dogSex.value,
          image: "placeholder.jpg"
        },
        location: { lat: locationLat.value, lng: locationLng.value },
        id: this.props.user._id
      });
      this.props.createFoundAdvert(advert);
    }
  };

  getLocation = location => {
    document.getElementById("location-input-lat").value = location.lat;
    document.getElementById("location-input-lng").value = location.lng;
  };

  render() {
    return (
      <div>
        <div>{this.props.message}</div>
        <form
          id="found-form"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="dog-breed">Порода:</label>
          <select onChange={this.handleInput} name="dogBreed">
            <option value="">Выберите породу</option>
            {this.state.breedOptions.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <label htmlFor="dog-description">Пол:</label>
          <label htmlFor="sexFilterMale">М</label>
          <input type="radio" name="dogSex" id="sexFilterMale" value="М" />
          <label htmlFor="sexFilterFemale">Ж</label>
          <input type="radio" name="dogSex" id="sexFilterFemale" value="Ж" />

          <label htmlFor="dog-description">Описание собаки:</label>
          <textarea
            onChange={this.handleInput}
            name="dogDescription"
            id="dog-description"
            type="text"
            style={{ resize: "none", height: "100px", width: "300px" }}
            required
          />

          <input
            id="location-input-lat"
            name="locationLat"
            hidden
            required
          ></input>
          <input id="location-input-lng" name="locationLng" hidden></input>

          <button>Submit</button>
        </form>
        <form onSubmit={this.handleImageUpload}>
          <input type="file" name="imgInput" />
          <button>Добавить картинку</button>
        </form>
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
    createFoundAdvert: advert => dispatch(createFoundAdvertAC(advert))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoundForm);
