import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from "react-native";
import {getMetricMetaInfo, timeToString} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";

function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        eat: 0,
        sleep: 0
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState(prevState => {
            const count = prevState[metric] + step;
            return {
                ...prevState,
                [metric]: count > max ? max : count
            }
        });
    };

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric);

        this.setState(prevState => {
            const count = prevState[metric] - step;
            return {
                ...prevState,
                [metric]: count < 0 ? 0 : count
            }
        });
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }));
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // Update Redux

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            eat: 0,
            sleep: 0
        }))

        // Navigate to home

        // Save to DB

        // Clear local notification
    };

    render() {
        const metaInfo = getMetricMetaInfo();

        return (
            <View>
                <DateHeader date={new Date().toLocaleDateString()} />
                {Object.keys(metaInfo).map(key => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? (
                                    <UdaciSlider
                                        value={value}
                                        onChange={value => this.slide(key, value)}
                                        {...rest}
                                    />
                                )
                                : (
                                    <UdaciSteppers
                                        value={value}
                                        increment={() => this.increment(key)}
                                        decrement={() => this.decrement(key)}
                                        {...rest}
                                    />
                                )}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

export default AddEntry;
