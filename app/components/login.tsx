import React from 'react';
import { Tabs ,Input , Tooltip,Button,Space} from 'antd';
import { InboxOutlined,InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


const onChange = (key: string) => {
    console.log(key);
};

const items = [
    {
        key: '1',
        label: `登陆`,
        children: <LoginUI/>,
    },
    {
        key: '2',
        label: `注册`,
        children: <RegisterUI/>,
    }
];

function LoginUI(){

    return <div>
                <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center'}}>
                    <Input
                        style={{ width: 350, justifyContent: 'center' }}
                        placeholder="Enter your username"
                        prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
                        suffix={
                            <Tooltip title="Extra information">
                                <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                            </Tooltip>
                        }
                    />
                </div>
                <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
                    <Input.Password
                        style={{ width: 350, justifyContent: 'center' }}
                        placeholder="input password"
                        iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
                    />
                </div>
                <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
                    <Button>登陆</Button>
                </div>
            </div>
}

function RegisterUI(){
    return <div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center'}}>
            <Input
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="Enter your email"
                prefix={<InboxOutlined className="site-form-item-icon" rev={undefined} />}
                suffix={
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                    </Tooltip>
                }
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="Enter your username"
                prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
                suffix={
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                    </Tooltip>
                }
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input.Password
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input.Password
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="confirm your password"
                iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Button>注册</Button>
        </div>
    </div>
}

export function Login() {
    return <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center'}}>
                <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                centered/>
             </div>
}
