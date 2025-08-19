import {Card, CardBody, CardHeader} from "@heroui/react"
import { 
    FileText, 
    Users, 
    Send, 
    Clock, 
    TrendingUp, 
    Eye,
    BarChart3,
    Activity
} from "lucide-react"
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"

// 模拟数据
const dailySubmissionData = [
    { date: '01/15', submissions: 45 },
    { date: '01/16', submissions: 52 },
    { date: '01/17', submissions: 38 },
    { date: '01/18', submissions: 67 },
    { date: '01/19', submissions: 73 },
    { date: '01/20', submissions: 58 },
    { date: '01/21', submissions: 61 },
]

const formTypeData = [
    { name: '联系表单', value: 35, color: '#0070f3' },
    { name: '调查问卷', value: 25, color: '#7c3aed' },
    { name: '申请表单', value: 20, color: '#059669' },
    { name: '反馈表单', value: 20, color: '#dc2626' },
]

const responseTimeData = [
    { hour: '0-2h', count: 120 },
    { hour: '2-4h', count: 85 },
    { hour: '4-8h', count: 45 },
    { hour: '8-24h', count: 25 },
    { hour: '1d+', count: 15 },
]

const conversionData = [
    { month: '九月', views: 1200, submissions: 320 },
    { month: '十月', views: 1450, submissions: 380 },
    { month: '十一月', views: 1600, submissions: 420 },
    { month: '十二月', views: 1800, submissions: 510 },
    { month: '一月', views: 2100, submissions: 630 },
]

export default function Index() {
    return (
        <div className="grid md:grid-rows-[2fr_5fr_5fr] grid-rows-[1fr_1fr_1fr] gap-4 h-full">
            {/* 第一行：4个统计卡片 */}
            <div className="grid md:grid-cols-[1fr_1fr_1fr_1fr] grid-cols-[1fr_1fr] gap-4">
                {/* 表单总数 */}
                <Card>
                    <CardBody className="flex flex-row items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">表单总数</p>
                            <p className="text-2xl font-bold">156</p>
                            <p className="text-xs text-green-600 flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +12%
                            </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                    </CardBody>
                </Card>

                {/* 活跃用户 */}
                <Card>
                    <CardBody className="flex flex-row items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">活跃用户</p>
                            <p className="text-2xl font-bold">2,847</p>
                            <p className="text-xs text-green-600 flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +8.5%
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </CardBody>
                </Card>

                {/* 提交次数 */}
                <Card>
                    <CardBody className="flex flex-row items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">提交次数</p>
                            <p className="text-2xl font-bold">18,429</p>
                            <p className="text-xs text-green-600 flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +15.3%
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Send className="w-6 h-6 text-green-600" />
                        </div>
                    </CardBody>
                </Card>

                {/* 平均完成时间 */}
                <Card>
                    <CardBody className="flex flex-row items-center justify-between p-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">平均完成时间</p>
                            <p className="text-2xl font-bold">3.2分</p>
                            <p className="text-xs text-red-600 flex items-center mt-1">
                                <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
                                -5.7%
                            </p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* 第二行：2个图表卡片 */}
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                {/* 每日提交统计 */}
                <Card className="flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                                每日提交统计
                            </h3>
                            <span className="text-sm text-gray-500">最近7天</span>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dailySubmissionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="submissions" 
                                        stroke="#0070f3" 
                                        fill="#0070f3" 
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>

                {/* 表单类型分布 */}
                <Card className="hidden md:flex md:flex-col">
                    <CardHeader className="pb-2">
                        <h3 className="text-lg font-semibold flex items-center">
                            <Eye className="w-5 h-5 mr-2 text-purple-600" />
                            表单类型分布
                        </h3>
                    </CardHeader>
                    <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={formTypeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip 
                                        formatter={(value) => [`${value}%`, '占比']}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#7c3aed" 
                                        fill="#7c3aed" 
                                        fillOpacity={0.2}
                                        strokeWidth={3}
                                        dot={{ fill: '#7c3aed', strokeWidth: 2, r: 5 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* 第三行：2个图表卡片 */}
            <div className="grid md:grid-cols-[1fr_1fr] grid-cols-[1fr] gap-4">
                {/* 响应时间分布 */}
                <Card className="flex flex-col">
                    <CardHeader className="pb-2">
                        <h3 className="text-lg font-semibold flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-green-600" />
                            响应时间分布
                        </h3>
                    </CardHeader>
                    <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={responseTimeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="hour" 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Bar 
                                        dataKey="count" 
                                        fill="#059669" 
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>

                {/* 转化率趋势 */}
                <Card className="hidden md:flex md:flex-col">
                    <CardHeader className="pb-2">
                        <h3 className="text-lg font-semibold flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                            转化率趋势
                        </h3>
                    </CardHeader>
                    <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={conversionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="views" 
                                        stroke="#dc2626" 
                                        strokeWidth={2}
                                        dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                                        name="浏览量"
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="submissions" 
                                        stroke="#0070f3" 
                                        strokeWidth={2}
                                        dot={{ fill: '#0070f3', strokeWidth: 2, r: 4 }}
                                        name="提交量"
                                    />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}