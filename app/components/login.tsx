import React from 'react';
import { Tabs ,Input , Tooltip,Button, notification} from 'antd';
import { CheckCircleOutlined, InboxOutlined,InfoCircleOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Countdown, {CountdownApi} from "react-countdown";


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
                        placeholder="输入用户名"
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
                        placeholder="输入密码"
                        iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
                    />
                </div>
                <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
                    <Button>登陆</Button>
                </div>
            </div>
}

function RegisterUI(){
    const [email,setEmail] = React.useState("");
    const [code,setCode] = React.useState("");
    const [userName,setUserName] = React.useState("");
    const [password,setPassword] = React.useState("");
    const [confirmPassword,setConfirmPassword] = React.useState("");
    const [date,setDate] = React.useState(Date.now() + 5 * 60 * 1000)
    let countdownApi: CountdownApi | null = null;

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (desc:string) => {
        api.open({
            message: '注册通知',
            description:desc,
            duration: 2,
        });
    };

    // Random component
    const Completionist = () => <Button style={{marginLeft:'40px',height: 43}} onClick={() => mailTriggerSubmit(email)}>发送</Button>;

    // Renderer callback with condition
    // @ts-ignore
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else if(countdownApi?.isStopped()){
            return <Completionist />;
        }
        else if(! countdownApi?.isStarted()){
            return <Completionist />;
        } else{
            // Render a countdown
            return <><Button disabled style={{marginLeft:'40px',height: 43}} onClick={() => mailTriggerSubmit(email)}>发送</Button>&nbsp;<span>{minutes}:{seconds}</span></>;
        }
    };


    const handleStartClick = (): void => {
        countdownApi && countdownApi.start();
    };

    const handleComplete = (): void => {
        setDate(Date.now() + 5 * 60 * 1000);
    };

    const setRef = (countdown: Countdown | null): void => {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    };

    const emailChange = (e:any) => {
        setEmail(e.target.value);
    };

    const codeChange = (e:any) => {
        setCode(e.target.value);
    };

    const userNameChange = (e:any) => {
        setUserName(e.target.value);
    };

    const passwordChange = (e:any) => {
        setPassword(e.target.value);
    };

    const confirmPasswordChange = (e:any) => {
        setConfirmPassword(e.target.value);
    };

    const checkOnRegister = () => {
        if(email == "" || email.trim() == ""){
            openNotification("邮箱不能为空");
            return false;
        }

        if(code == "" || code.trim() == ""){
            openNotification("邮箱验证码不能为空");
            return false;
        }

        if(userName == "" || userName.trim() == ""){
            openNotification("用户名不能为空");
            return false;
        }

        if(password == "" || password.trim() == ""){
            openNotification("密码不能为空");
            return false;
        }

        if(confirmPassword == "" || confirmPassword.trim() == ""){
            openNotification("密码不能为空");
            return false;
        }

        if(confirmPassword != password){
            openNotification("两次密码不一致");
            return false;
        }

        return true;
    };

    const mailTriggerSubmit = (email:string) => {

        // 使用 fetch 发送 POST 请求
        fetch('https://43d51cd6.r20.cpolar.top/wisdom/api/user/sendEmail?email=' + email, {
            method: 'POST', // 指定请求方法为 POST
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头
            },
        })
            .then(response => response.json()) // 解析响应为 JSON
            .then(data => {
                console.log(data); // 打印响应数据
                handleStartClick();
            })
            .catch(error => {
                console.error('Error:', error); // 打印任何错误
            });
    }

    const handleRegister = () => {
        if(checkOnRegister()) {
            // 定义要发送的数据
            const data = {
                id: 0,
                userName: {userName},
                password: {password},
                email: {email},
                integral: 0,
                sysCreateTime: "",
                sysUpdateTime: "",
                isDel: 0,
                inviteUser: ""
            };

            // 使用 fetch 发送 POST 请求
            fetch('https://43d51cd6.r20.cpolar.top/wisdom/api/user/register?code='+code, {
                method: 'POST', // 指定请求方法为 POST
                mode: "cors",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json' // 设置请求头，指定发送的数据类型为 JSON
                },
                body: JSON.stringify(data) // 将 JavaScript 对象转换为 JSON 字符串
            })
                .then(response => response.json()) // 解析响应为 JSON
                .then(data => {
                    console.log(data); // 打印响应数据
                })
                .catch(error => {
                    console.error('Error:', error); // 打印任何错误
                });
        }

    }

    return <div>
        {contextHolder}
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center'}}>
            <Input
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="输入邮箱"
                prefix={<InboxOutlined className="site-form-item-icon" rev={undefined} />}
                suffix={
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                    </Tooltip>
                }
                value={email}
                onChange={(e) => emailChange(e)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input
                style={{ width: 246, justifyContent: 'center' }}
                placeholder="邮箱验证码"
                prefix={<CheckCircleOutlined className="site-form-item-icon" rev={undefined} />}
                suffix={
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                    </Tooltip>
                }
                value={code}
                onChange={(e) => codeChange(e)}
            />
            <Countdown
                date={date}
                renderer={renderer}
                autoStart={false}
                ref={setRef}
                onComplete={handleComplete}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="输入用户名"
                prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />}
                suffix={
                    <Tooltip title="Extra information">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}} rev={undefined} />
                    </Tooltip>
                }
                value={userName}
                onChange={(e) => userNameChange(e)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input.Password
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="输入密码"
                iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
                value={password}
                onChange={(e) => passwordChange(e)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Input.Password
                style={{ width: 350, justifyContent: 'center' }}
                placeholder="确认密码"
                iconRender={(visible) => (visible ? <EyeTwoTone rev={undefined} /> : <EyeInvisibleOutlined rev={undefined} />)}
                value={confirmPassword}
                onChange={(e) => confirmPasswordChange(e)}
            />
        </div>
        <div style={{ alignItems: 'center',display: 'flex', justifyContent: 'center',marginTop:'10px'}}>
            <Button onClick={handleRegister}>注册</Button>
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
