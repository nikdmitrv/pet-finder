import React, { Component } from "react";

class FilterForm extends Component {
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

  handleSubmit = event => {
    event.preventDefault();
    const { breed, sex, date } = event.target;
    this.props.handleFiltration({
      byBreed: breed.value,
      bySex: sex.value,
      byDate: date.value
    });
  };

  render() {
    return (
      <form className="long" onSubmit={this.handleSubmit}>
        <div className="long form-row">
          <div className=" form-group col-md-3">
            <select name="breed" className="form-control">
              <option value="">Выберите породу</option>
              {this.state.breedOptions.map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-1">
            <label>Пол:</label>
            <span> </span>
            <label htmlFor="sexFilterMale">М</label>
            <input type="radio" name="sex" id="sexFilterMale" value="М" />
            <label htmlFor="sexFilterFemale">Ж</label>
            <input type="radio" name="sex" id="sexFilterFemale" value="Ж" />
          </div>

          <div className="form-group col-md-3">
            {/* <label htmlFor="dateFilter">Дата</label> */}
            <input
              placeholder="Дата"
              type="date"
              name="date"
              id="dateFilter"
              className="form-control"
            />
          </div>
          <div className="form-group col-md-1">
            <button className="btn btn-info btn-filter">Фильтр</button>
          </div>
        </div>
      </form>
    );
  }
}

export default FilterForm;
