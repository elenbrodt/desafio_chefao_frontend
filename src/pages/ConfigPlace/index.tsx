import { FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import Header from "../../components/Header";
import InputLogin from "../../components/InputLogin";
import SubmitButton from "../../components/SubmitButton";
import { byIdPlace, updatePlace } from "../../services/MainApi/place";
import { useOwner } from "../../store/modules/owner";
import { Column, Container, UpdateInput } from "./styles";

interface Place {
  name: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  district: string;
  street: string;
  place_number: string;
  complement: string;
  image_link: string;
  capacity: number;
  description: string;
  phone: string;
  average_ticket_price: string;
  social_media: string;
  opening_hours: string;
  payment: string;
}

function ConfigPlace() {
  const urlPlaceId = window.location.pathname.split("/")[2];

  const { register, handleSubmit } = useForm();

  const ownerData = useOwner();
  const [owner_id, setOwnerId] = useState<string>("");
  const [place, setPlace] = useState<Place>();
  const navigate = useNavigate();

  useEffect(() => {
    /* if (dataFetchRef.current) return;
    dataFetchRef.current = true; */
    if (ownerData.isLogged) {
      setOwnerId(ownerData.findOwner.id);
      const getData = async () => {
        try {
          const response = await byIdPlace(urlPlaceId);
          setPlace(response.data);
        } catch (error) {
          alert("Deu algo errado no catch");
        }
      };
      getData();
    }
  }, [urlPlaceId, ownerData]);

  const onSubmit = (data: any) => {
    if (data.name == "") {
      data.name = place?.name;
    }
    if (data.city == "") {
      data.city = place?.city;
    }
    if (data.state == "") {
      data.state = place?.state;
    }
    if (data.country == "") {
      data.country = place?.country;
    }
    if (data.zipcode == "") {
      data.zipcode = place?.zipcode;
    }
    if (data.district == "") {
      data.district = place?.district;
    }
    if (data.street == "") {
      data.street = place?.street;
    }
    if (data.place_number == "") {
      data.place_number = place?.place_number;
    }
    if (data.complement == "") {
      data.complement = place?.complement;
    }
    if (data.image_link == "") {
      data.image_link = place?.image_link;
    }
    if (data.capacity == "") {
      data.capacity = place?.capacity;
    }
    if (data.description == "") {
      data.description = place?.description;
    }
    if (data.phone == "") {
      data.phone = place?.phone;
    }
    if (data.average_ticket_price == "") {
      data.average_ticket_price = place?.average_ticket_price;
    }
    if (data.social_media == "") {
      data.social_media = place?.social_media;
    }
    if (data.opening_hours == "") {
      data.opening_hours = place?.opening_hours;
    }
    if (data.payment == "") {
      data.payment = place?.payment;
    }
    placeUpdate(
      data.name,
      data.city,
      data.state,
      data.country,
      data.zipcode,
      data.district,
      data.street,
      data.place_number,
      data.complement,
      data.image_link,
      data.capacity,
      data.description,
      data.phone,
      data.average_ticket_price,
      data.social_media,
      data.opening_hours,
      data.payment,
      owner_id,
      urlPlaceId
    );
  };

  const placeUpdate = async (
    name: string,
    city: string,
    state: string,
    country: string,
    zipcode: string,
    district: string,
    street: string,
    place_number: string,
    complement: number,
    image_link: string,
    capacity: number,
    description: string,
    phone: string,
    average_ticket_price: string,
    social_media: string,
    opening_hours: string,
    payment: string,
    owner_id: string,
    place_id: string
  ) => {
    const req = {
      name: name,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
      district: district,
      street: street,
      place_number: place_number,
      complement: complement,
      image_link: image_link,
      capacity: capacity,
      description: description,
      phone: phone,
      average_ticket_price: average_ticket_price,
      social_media: social_media,
      opening_hours: opening_hours,
      payment: payment,
      owner_id: owner_id,
      place_id: place_id,
    };
    console.log(req);
    try {
      const response = await updatePlace(req);
      console.log(response);
      navigate("/");
    } catch (error) {
      alert("Deu algo errado no catch");
    }
  };

  return (
    <>
      <Header />
      <img src={place?.image_link} alt='Imagem do estabelecimento' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Column>
          <UpdateInput
            theme='signin'
            type='text'
            defaultValue={place?.name}
            placeholder='Digite o nome'
            {...register("name")}
          />

          <UpdateInput
            theme='signin'
            type='text'
            defaultValue={place?.street}
            placeholder='Digite a rua do seu endereço'
            {...register("street")}
          />

          <Container>
            <UpdateInput
              theme='signin'
              type='text'
              defaultValue={place?.place_number}
              placeholder='Digite o número do endereço'
              {...register("place_number")}
            />

            <UpdateInput
              theme='signin'
              type='text'
              defaultValue={place?.complement}
              placeholder='Digite o complemento'
              {...register("complement")}
            />

            <UpdateInput
              theme='signin'
              defaultValue={place?.zipcode}
              type='text'
              placeholder='Digite seu CEP'
              {...register("zipcode")}
            />
          </Container>
          <Container>
            <UpdateInput
              theme='signin'
              defaultValue={place?.district}
              type='text'
              placeholder='Digite seu bairro'
              {...register("district")}
            />

            <UpdateInput
              theme='signin'
              defaultValue={place?.city}
              type='text'
              placeholder='Digite sua cidade'
              {...register("city")}
            />

            <UpdateInput
              theme='signin'
              defaultValue={place?.state}
              type='text'
              placeholder='Digite seu estado'
              {...register("state")}
            />

            <UpdateInput
              theme='signin'
              defaultValue={place?.country}
              type='text'
              placeholder='Digite seu país'
              {...register("country")}
            />
          </Container>
          <Container>
            <UpdateInput
              type='text'
              defaultValue={place?.average_ticket_price}
              placeholder='Digite o valor'
              theme='signin'
              {...register("average_ticket_price")}
            />

            <UpdateInput
              type='text'
              defaultValue={place?.average_ticket_price}
              placeholder='Digite o valor'
              theme='signin'
              {...register("payment")}
            />

            <UpdateInput
              type='number'
              defaultValue={place?.capacity}
              placeholder='Digite a lotação'
              theme='signin'
              {...register("capacity")}
            />
          </Container>

          <UpdateInput
            theme='signin'
            type='text'
            defaultValue={place?.image_link}
            placeholder='Link da imagem do estabelecimento'
            {...register("image_link")}
          />

          <Container>
            <UpdateInput
              theme='signin'
              defaultValue={place?.opening_hours}
              type='text'
              placeholder='Digite o horário'
              {...register("opening_hours")}
            />

            <UpdateInput
              theme='text'
              defaultValue={place?.phone}
              type='text'
              placeholder='Digite seu telefone para contato'
              {...register("phone")}
            />

            <UpdateInput
              theme='text'
              defaultValue={place?.social_media}
              type='text'
              placeholder='Digite seu link do Instagram'
              {...register("social_media")}
            />
          </Container>

          <UpdateInput
            theme='description'
            defaultValue={place?.description}
            type='text'
            placeholder='Digite um breve texto de apresentação'
            {...register("description")}
          />

          <SubmitButton text='Salvar alterações' />
        </Column>
      </form>
      <Footer />
    </>
  );
}
export default ConfigPlace;
