import './styles.css'
import React, { useState } from "react"
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { message, Form, Input, Button, InputNumber } from 'antd'
import { SaveOutlined } from  '@ant-design/icons';


export default function AdicionarProduto(){  
    const [disabled, setDisabled] = useState(false)
    const history = useHistory()
    async function handleSubmit(produto){
        setDisabled(true)
        api.post('/item', produto)
        .then((response) =>{
           if(response.status === 201){
            message.success('Produto criado com sucesso', 5, true);
            history.push('/produtos')
            }
        })
        .catch((err) => {
            message.error("Aconteceu um erro ao adicionar o produto" + err.response.data.message)
        })
    }

    return(
        <div className="produto__container">
            <h1>Adicionar novo produto</h1>
            <br/>
            <div className="produto__card__container">
                <Form
                  name="submiProduto"
                  labelCol={{ span: 10 }}
                   wrapperCol={{ span: 16 }}
                   onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                    label='Nome do item'
                    name="name"
                    rules={[{required: true, message:"o nome do item não pode ser vazio"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                    label='Descrição'
                    name="description"
                    rules={[{required: true, message:"Insira a descrição do Item"}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                    label='Quantidade'
                    name="quantity"
                    rules={[{required: true, message:"Insira a quantidade"}]}
                    >
                        <InputNumber/>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type='primary' htmlType='submit' icon={<SaveOutlined />} disabled={disabled}>
                            Adicionar
                        </Button>
                    </Form.Item>
                    
                 </Form>
                 
            </div>

        </div>
    )
} 